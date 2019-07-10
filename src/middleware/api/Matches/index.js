
import { FB_GetInfo_chi } from './FB_GetInfo_chi'


class Matches {
    constructor() {
        this.tmp = {
            CouponInfo: {},// 原始数据
        };
        this.cache = {            
            datePools: '',// datePools数据
        }
    }
    async datePools() {// 根据date{pool:[matches]}划分数据
        const { CouponInfo, result:FB_GetInfo_chi_res } = await FB_GetInfo_chi();
        this.tmp.CouponInfo = CouponInfo;
        // 获取所有的pool
        let poolAll = Array.from(new Set(FB_GetInfo_chi_res.data.reduce((a,b)=>a.concat(b.coupons.map(item=>item.pool)),[])));
        // console.log('poolAll',poolAll)
        // 一级分组：时间，二级分组：pool
        let dataTmp = FB_GetInfo_chi_res.data.map(item1=>{  
            poolAll.map(item2=>{
                let curPoolData = item1.coupons.filter(item3=>item2==item3.pool);
                let tmp = {};
                curPoolData.map(item3=>{// 同国家同开场时间的分为一组，此方法可推广其他相关业务
                    tmp[item3.league + '_' + item3.matchDateTime] = tmp[item3.league + '_' + item3.matchDateTime] || {league:'',oddsNames:[],matches:[]};
                    tmp[item3.league + '_' + item3.matchDateTime].league = item3.league;
                    const oddsNames = ()=>{
                        if(item3.oddsSet.length){
                            if(item3.oddsSet[0].oddsInfo.length<4){
                                return item3.oddsSet[0].oddsInfo.map(item=>item.name);
                            }else{
                                return []
                            }
                        }else{
                            return []
                        }
                    }
                    tmp[item3.league + '_' + item3.matchDateTime].oddsNames = oddsNames();
                    tmp[item3.league + '_' + item3.matchDateTime].matches.push(item3)
                })
                // console.log('tmp',tmp)
                let matches = [];
                for(let key in tmp){
                    matches.push(tmp[key])
                }

                item1[item2] = matches;
            })
            delete item1.coupons;
            return item1;
        })

        return {
            data: dataTmp
        };
    }
    async poolsDate() {// 根据pool{date:[matches]}划分数据: 未使用，待优化
        const FB_GetInfo_chi = await FB_GetInfo_chi();
        // 获取所有的pool
        let poolAll = Array.from(new Set(FB_GetInfo_chi_res.data.reduce((sum,item)=>sum.concat(item.coupons.map(item2=>item2.pool)),[])));
        let poolData = {};
        // 一级分组：时间，二级分组：pool
        FB_GetInfo_chi_res.data.map(item1=>{  
            poolAll.map(item2=>{                
                // 获取所有当前pool类型的Coupons
                let curPoolCoupons = FB_GetInfo_chi_res.data.map(item3=>{
                    return item3.coupons.filter(item4=>item2==item4.pool);
                })
                // 二维数组转一维数组
                curPoolCoupons = curPoolCoupons.reduce((sum,item3)=>{                            
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
    async filter(type) {// 筛选数据
        let datePools = {};
        if(this.cache.datePools){// 读取变量缓存数据
            datePools = this.cache.datePools;
        }else{// 首次获取数据
            datePools = await this.datePools();
            this.cache.datePools = datePools;            
        }
        const result = {data:[]};
        datePools.data.filter(item=>{
            // console.log(type, item[type], item)
            result.data.push({
                date: item.date,
                coupons: item[type] || [],
            })
        })

        return result;
    }

}
export default new Matches()
