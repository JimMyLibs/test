
import Pools from '../Pools'
import { FB_GetInfo } from './FB_GetInfo'
import { useCaseCache } from '../../config/project'


class Matches {
    constructor() {
        this.cache = {
            datePools: 0,// datePools数据
            FB_GetInfo: 0,
        }
    }
    async initFB_GetInfo() {
        if (useCaseCache) {
            if (!this.cache.FB_GetInfo) {// 读取变量缓存数据
                this.cache.FB_GetInfo = await FB_GetInfo();
            }
        } else {
            this.cache.FB_GetInfo = await FB_GetInfo();
        }
        return this.cache.FB_GetInfo;
    }
    async getFilterMenu() {
        let FB_GetInfo_data = await this.initFB_GetInfo();
        const { result: FB_GetInfo_res } = FB_GetInfo_data;
        // 获取所有的date
        const dateList = Array.from(new Set(FB_GetInfo_res.data.map(item => item.date)));
        // 获取所有的league
        const leagueList = Array.from(new Set(FB_GetInfo_res.data.reduce((a, b) => {
            return a.concat(b.coupons.map(item => item.league))
        }, [])));
        // 获取所有的pool
        let poolList = {};
        let poolOfData = Array.from(new Set(FB_GetInfo_res.data.reduce((a, b) => a.concat(b.coupons.map(item => item.pool)), [])));
        poolOfData.map(item => {
            if (Pools.list[item]) {
                poolList[item] = Pools.list[item];
            }
        })
        return {
            ErrCode: 0,
            ErrMsg: '',
            data: {
                poolList,
                dateList,
                leagueList,
            }
        }
    }
    async getOriginalData() {
        let FB_GetInfo_data = await this.initFB_GetInfo();
        const { result: FB_GetInfo_res, CouponInfo, TournamentPoolInfo } = FB_GetInfo_data;
        return {
            ErrCode: 0,
            ErrMsg: '',
            data: {
                FB_GetInfo_res,
                CouponInfo,
                TournamentPoolInfo,
            }
        };
    }
    async datePools() {// 根据date{pool:[matches]}划分数据
        let FB_GetInfo_data = await this.initFB_GetInfo();
        const { result: FB_GetInfo_res, CouponInfo, TournamentPoolInfo } = FB_GetInfo_data;
        const FB_GetInfo_replacement = JSON.parse(JSON.stringify(FB_GetInfo_res))
        // console.log('poolOfData',poolOfData)
        // 一级分组：时间，二级分组：pool
        let poolOfData = Array.from(new Set(FB_GetInfo_replacement.data.reduce((a, b) => a.concat(b.coupons.map(item => item.pool)), [])));
        let datePools_res = FB_GetInfo_replacement.data.map(item1 => {
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
            ErrCode: 0,
            ErrMsg: '',
            data: datePools_res,
        };
    }
    async poolsDate() {// 根据pool{date:[matches]}划分数据: 未使用，待优化
        const { result: FB_GetInfo_res } = await FB_GetInfo();
        // 获取所有的pool
        let poolOfData = Array.from(new Set(FB_GetInfo_res.data.reduce((sum, item) => sum.concat(item.coupons.map(item2 => item2.pool)), [])));
        let poolData = {};
        // 一级分组：时间，二级分组：pool
        FB_GetInfo_res.data.map(item1 => {
            poolOfData.map(item2 => {
                // 获取所有当前pool类型的Coupons
                let curPoolCoupons = FB_GetInfo_res.data.map(item3 => {
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
        const { pool = '', date = '', league = '', inPlay = '' } = params;
        if (useCaseCache) {
            if (!this.cache.datePools) {// 读取变量缓存数据
                this.cache.datePools = await this.datePools();
            }
        } else {
            this.cache.datePools = await this.datePools();
        }
        const datePools = JSON.parse(JSON.stringify(this.cache.datePools));
        let filterDate = datePools.data.filter(item => date ? (item.date === date) : true);

        let filterResult = filterDate.map(item => {
            if (pool) {
                const filterPool = item[pool].filter((item2, index2) => {
                    item2.matches = item2.matches.filter((item3, index3) => {
                        if ((index2 + index3) < 3) {
                            item3.webUrl = 'https://wwww.baidu.com/'
                        }
                        const validateInPlay = inPlay !== '' ? item3.inPlay == inPlay : true;// inPlay为空时取全部,兼容0==false,1==true
                        return validateInPlay;
                    })
                    const validateLeague = league ? item2.league == league : true;// league为空时取全部
                    return validateLeague && item2.matches.length;// if matches.length==0, this item isn't return
                })
                return {
                    date: item.date,
                    coupons: filterPool || [],
                }
            } else {
                return item;
            }
        })
        filterResult = filterResult.filter(item => item.coupons.length);
        console.log('Filter', { ...params }, { ...filterResult })
        return {
            ErrCode: 0,
            ErrMsg: '',
            data: {
                matchList: filterResult
            },
        };
    }

}
export default new Matches()
