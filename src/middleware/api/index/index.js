import { $post, $get } from '../../fetch/Http'
import { obj2Arr } from '../../utils/utils'
import poolsList from './poolsList'

// 本地调试，临时导入json
import json_FB_GetInfo_chi from '../../xml/index/FB_GetInfo_chi.json'


class Api {
    constructor() {
        this.poolsList = poolsList;
        this.tmp = {};
    }
    async getData(name) {
        try {
            if (json_FB_GetInfo_chi) {
                return json_FB_GetInfo_chi;
            } else {
                const LSdata = window.localStorage ? localStorage.getItem(name) : false;
                if (LSdata) {
                    return JSON.parse(LSdata);// 100ms
                } else {
                    const resData = await $get(name);// 300ms
                    window.localStorage && localStorage.setItem(name, JSON.stringify(resData));
                    return resData;
                }
            }
        } catch (err) {
            throw err;
        }
    }
    async FB_GetInfo_chi() {// 2.2.4.7  // 获取并编排所有数据
        const resData = await this.getData('/xml/index/FB_GetInfo_chi.xml');
        const { Coupons: { CouponInfo }, TournamentPools: { TournamentPoolInfo } } = resData.AOSBS_XML;
        let result = { data: [] };
        try {
            CouponInfo.map((item1, index1) => {
                // Jim@2019-06-17 17:43:23：fix xml2json bug
                let { Matches: { MatchInfo } } = item1;
                MatchInfo = obj2Arr(MatchInfo);

                let dataPerDay = {};// 每天赛事
                // 赛事日期
                dataPerDay.date = `${MatchInfo[0] ? MatchInfo[0].Date : ''}(${item1.NameShort})`;
                dataPerDay.coupons = [];// 赛事列表          
                // console.log(index1,item1)
                MatchInfo.map((item2, index2) => {
                    // console.log(index1+'_'+index2, item2.Pools.PoolInfo)

                    const getPoolInfo = (PoolInfo, poolType = '') => {
                        PoolInfo.map((item3, index3) => {
                            if (item3.Pool == 'HFMP') {// 6宝半全场
                                getPoolInfo(item3.LegInfo, 'HFMP');
                            } else {// 普通类型
                                let matches_item = {};// 每场比赛

                                let pool = poolType || item3.Pool;
                                matches_item.league = item2.League;// 国家地区
                                matches_item.home = item2.Home;
                                matches_item.away = item2.Away;
                                matches_item.score_Home = item2.Progress.Result.split(':')[0];
                                matches_item.score_Away = item2.Progress.Result.split(':')[1];
                                matches_item.matchDateTime = item2.MatchPoolCloseTime + ' ' + item2.MatchPoolCloseDate;

                                matches_item.pool = pool;// 投注类型
                                matches_item.poolNum = PoolInfo.length;
                                matches_item.corner = item2.Progress.Corner;
                                matches_item.inPlay = item2.Inplay;
                                matches_item.oddsSet = [];// 每场比赛的投注池

                                item3.OddsSet = obj2Arr(item3.OddsSet);
                                item3.OddsSet.map((item4, index4) => {
                                    let pools_item = {};// 每个投注项
                                    pools_item.enabled = item3.Enabled;
                                    pools_item.oddsUpdateTime = item3.OddsUpdateTime;// 更新时间
                                    pools_item.stopSell = item3.StopSell;// 停售时间
                                    pools_item.oddsInfo = [];// 每个投注项的赔率列表

                                    item4.OddsInfo = obj2Arr(item4.OddsInfo);
                                    item4.OddsInfo.map((item6, index6) => {
                                        let oddsInfo_item = {};// 每种赔率详情
                                        if (pool == 'HAD') {// 主客和
                                            if (item6.Number == 1) {// Home
                                                oddsInfo_item.name = 'H';
                                            } else if (item6.Number == 'X') {// D
                                                oddsInfo_item.name = 'D';
                                            } else if (item6.Number == 2) {// Away
                                                oddsInfo_item.name = 'A';
                                            }
                                            oddsInfo_item.odds = item6.Odds;
                                        } else if (pool == 'HDC') {// 投注经让球调整后之赛果
                                            if (item6.Number == 1) {
                                                oddsInfo_item.name = 'H';
                                            } else if (item6.Number == 'X') {
                                                oddsInfo_item.name = 'D';
                                            } else if (item6.Number == 2) {
                                                oddsInfo_item.name = 'C';
                                            }
                                            oddsInfo_item.odds = item6.Odds;
                                        } else if (pool == 'HFT') {// 预测球赛中半场(45分钟)及全场(90分钟)之主客和赛果
                                            if (item6.Number == '1-1') {// Home
                                                oddsInfo_item.name = 'H';
                                            } else if (item6.Number == 'X-1') {// D
                                                oddsInfo_item.name = 'D';
                                            } else if (item6.Number == '2-1') {// Away
                                                oddsInfo_item.name = 'A';
                                            }
                                            oddsInfo_item.odds = item6.Odds;
                                        } else if (pool == 'FHAD') {// 预测一场球赛的上半场赛果
                                            // no data
                                        } else if (pool == 'HHAD') {// 较强之球队让球于较弱之球队
                                            // no data
                                        } else if (pool == 'HILO') {// 投注者可就一场球赛的入球个数高于或低于预判者所指定的数目(中位球数)下注
                                            // no data
                                        } else if (pool == 'CHLO') {// 投注于指定球赛中，两队合共开出的角球个数*多于或少于指定的角球数
                                            // no data
                                        } else if (pool == 'PS') {// 不包括加时或互射12码后的赛果
                                            // no data
                                        } else if (pool == 'GPW') {// 投注分组阶段小组首名出线队伍
                                            // 分组
                                        } else if (pool == 'GPF') {// 投注分组阶段小组的顺序首、次出线队伍
                                            // 分组
                                        } else if (pool == 'TPS') {// 投注整个锦标赛射入最多入球的球员
                                            // 分组
                                        } else if (pool == 'CP') {// 在指定赛事，投注哪队能赢得冠军
                                            // no data
                                        } else if (pool == 'DHCP') {// 预测两场球赛中板厂(45分钟)及全场(90分钟)的正式比分
                                            // no data
                                        } else if (pool == '6FH') {// 6宝半全场
                                            // no data
                                        }else{// 普通类型
                                            {
                                                if (pool == 'TQL') {// 在指定赛事，投注哪队能晋级下一场赛事
                                                    
                                                } else if (pool == 'CRS') {// 预测球赛的正式比分
                                                    
                                                } else if (pool == 'FCS') {// 投注一场球赛法定时间上半场45分钟及上半场补时的比分
                                                    
                                                } else if (pool == 'TTG') {// 预测球赛中两队的入球个数
                                                    
                                                } else if (pool == 'OOE') {// 预测球赛中两队的入球个数为单数或双数
        
                                                } else if (pool == 'FHL') {// 投注一场球赛的上半场入球个数，多于或少于指定的球数

                                                } else if (pool == 'FGS') {// 投注一场球赛中最先射入对方球门得分的球员

                                                } else if (pool == 'FTS') {// 投注哪队于法定时间(90分钟)获得第一个入球或无入球
        
                                                }
                                            }
                                            oddsInfo_item.name = item6.Number;
                                            oddsInfo_item.odds = item6.Odds;
                                        }
                                        pools_item.oddsInfo.push(oddsInfo_item);
                                    })
                                    matches_item.oddsSet.push(pools_item);
                                })

                                dataPerDay.coupons.push(matches_item);// 拆散polls扁平到coupons层级
                            }
                        })
                    }
                    getPoolInfo(item2.Pools.PoolInfo);
                })
                result.data.push(dataPerDay);
            })

            this.tmp.CouponInfo = CouponInfo;
            return result;
        } catch (err) {
            console.error(err);
            return err.message;
        }
    }
    async datePools() {// 根据date{pool:[matches]}划分数据
        const FB_GetInfo_chi = await this.FB_GetInfo_chi();
        // 获取所有的pool
        let poolAll = Array.from(new Set(FB_GetInfo_chi.data.reduce((a,b)=>a.concat(b.coupons.map(item=>item.pool)),[])));
        // console.log('poolAll',poolAll)
        // 一级分组：时间，二级分组：pool
        let dataTmp = FB_GetInfo_chi.data.map(item1=>{  
            poolAll.map(item2=>{
                let curPoolData = item1.coupons.filter(item3=>item2==item3.pool);
                let tmp = {};
                curPoolData.map(item3=>{// 同国家同开场时间的分为一组，此方法可推广其他相关业务
                    tmp[item3.league + '_' + item3.matchDateTime] = tmp[item3.league + '_' + item3.matchDateTime] || {league:'',matches:[]};
                    tmp[item3.league + '_' + item3.matchDateTime].league = item3.league;
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
    async poolDate() {// 根据pool{date:[matches]}划分数据: 未使用，待优化
        const FB_GetInfo_chi = await this.FB_GetInfo_chi();
        // 获取所有的pool
        let poolAll = Array.from(new Set(FB_GetInfo_chi.data.reduce((sum,item)=>sum.concat(item.coupons.map(item2=>item2.pool)),[])));
        let poolData = {};
        // 一级分组：时间，二级分组：pool
        FB_GetInfo_chi.data.map(item1=>{  
            poolAll.map(item2=>{                
                // 获取所有当前pool类型的Coupons
                let curPoolCoupons = FB_GetInfo_chi.data.map(item3=>{
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
    async filterMatches(type) {// 筛选数据
        const datePools = await this.datePools();
        const result = {data:[]};
        datePools.data.filter(item=>{
            console.log(type, item[type], item)
            result.data.push({
                date: item.date,
                coupons: item[type] || [],
            })
        })

        return result;
    }

}
export default new Api()
