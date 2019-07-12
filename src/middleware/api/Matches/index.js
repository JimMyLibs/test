
import Pools from '../pools'
import { FB_GetInfo_chi } from './FB_GetInfo_chi'


class Matches {
    constructor() {
        this.cache = {
            datePools: '',// datePools数据
        }
        this.poolList = {};
        this.dateList = [];
        this.leagueList = [];
    }
    async datePools() {// 根据date{pool:[matches]}划分数据
        const { result: FB_GetInfo_chi_res, CouponInfo, TournamentPoolInfo } = await FB_GetInfo_chi();
        const FB_GetInfo_chi_old = JSON.parse(JSON.stringify(FB_GetInfo_chi_res));
        // 获取所有的date
        this.dateList = Array.from(new Set(FB_GetInfo_chi_res.data.map(item => item.date)));
        // 获取所有的league
        this.leagueList = Array.from(new Set(FB_GetInfo_chi_res.data.reduce((a, b) => a.concat(b.coupons.map(item => item.league)), [])));
        // 获取所有的pool
        let poolOfData = Array.from(new Set(FB_GetInfo_chi_res.data.reduce((a, b) => a.concat(b.coupons.map(item => item.pool)), [])));
        poolOfData.map(item=>{
            if(Pools.list[item]){
                this.poolList[item] = Pools.list[item];
            }
        })
        // console.log('poolOfData',poolOfData)
        // 一级分组：时间，二级分组：pool
        let datePools_result = FB_GetInfo_chi_res.data.map(item1 => {
            poolOfData.map(item2 => {
                let curPoolData = item1.coupons.filter(item3 => item2 == item3.pool);
                let tmp = {};
                curPoolData.map((item3, index3) => {// 同国家同开场时间的分为一组，此方法可推广其他相关业务              
                    tmp[item3.league + '_' + item3.matchDateTime] = tmp[item3.league + '_' + item3.matchDateTime] || { league: '', oddsNames: [], matches: [] };
                    tmp[item3.league + '_' + item3.matchDateTime].league = item3.league;
                    const oddsNames = () => {
                        if (item3.oddsSet.length) {
                            if (item3.oddsSet[0].oddsInfo.length < 4) {
                                return item3.oddsSet[0].oddsInfo.map(item => item.name);
                            } else {
                                return []
                            }
                        } else {
                            return []
                        }
                    }
                    tmp[item3.league + '_' + item3.matchDateTime].oddsNames = oddsNames();
                    tmp[item3.league + '_' + item3.matchDateTime].matches.push(item3);
                })
                // console.log('tmp',tmp)
                let matches = [];
                for (let key in tmp) {
                    matches.push(tmp[key])
                }

                item1[item2] = matches;
            })
            delete item1.coupons;
            return item1;
        })

        return {
            data: datePools_result,
            FB_GetInfo_chi_old,
            CouponInfo,
            TournamentPoolInfo,
        };
    }
    async poolsDate() {// 根据pool{date:[matches]}划分数据: 未使用，待优化
        const { result: FB_GetInfo_chi_res } = await FB_GetInfo_chi();
        // 获取所有的pool
        let poolOfData = Array.from(new Set(FB_GetInfo_chi_res.data.reduce((sum, item) => sum.concat(item.coupons.map(item2 => item2.pool)), [])));
        let poolData = {};
        // 一级分组：时间，二级分组：pool
        FB_GetInfo_chi_res.data.map(item1 => {
            poolOfData.map(item2 => {
                // 获取所有当前pool类型的Coupons
                let curPoolCoupons = FB_GetInfo_chi_res.data.map(item3 => {
                    return item3.coupons.filter(item4 => item2 == item4.pool);
                })
                // 二维数组转一维数组
                curPoolCoupons = curPoolCoupons.reduce((sum, item3) => {
                    sum.concat(item3)
                    return sum;
                });

                poolData[item2] = {
                    date: item1.date,
                    list: curPoolCoupons,
                }
            })
        })
        return poolData;
    }
    async filter(params) {// 筛选数据
        const { pool, date, league } = params;
        let datePools = {};
        if (this.cache.datePools) {// 读取变量缓存数据
            datePools = this.cache.datePools;
        } else {// 首次获取数据
            datePools = await this.datePools();
            this.cache.datePools = datePools;
        }
        const filterResult = [];
        datePools.data.map(item => {
            if (pool) {
                // console.log(pool, item[pool], item)
                item[pool] = item[pool].filter(item2 => {
                    return league ? item2.league == league : true;// league为空时取全部
                })
                if (date) {
                    if (item.date == date) {
                        filterResult.push({
                            date: item.date,
                            coupons: item[pool] || [],
                        })
                    }
                } else {// date为空时取全部
                    filterResult.push({
                        date: item.date,
                        coupons: item[pool] || [],
                    })
                }
            } else {
                return item;
            }
        })
        console.log('过滤', params, filterResult)
        return {
            data: filterResult,
        };
    }

}
export default new Matches()
