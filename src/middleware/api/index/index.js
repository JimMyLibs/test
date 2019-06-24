import { $post, $get } from '../../fetch/Http'
import { obj2Arr } from '../../utils/utils'
import poolList from './poolList'

// 本地调试，临时导入json
import json_FB_GetInfo_chi from '../../xml/index/FB_GetInfo_chi.json'


class Api {
    constructor() {
        this.poolList = poolList;
        this.tmp = {};
    }
    async getData(name) {
        try {
            if(json_FB_GetInfo_chi){
                return json_FB_GetInfo_chi;
            }else{
                const LSdata = window.localStorage?localStorage.getItem(name):false;
                if (LSdata) {
                    return JSON.parse(LSdata);// 100ms
                } else {
                    const resData = await $get(name);// 300ms
                    window.localStorage&&localStorage.setItem(name, JSON.stringify(resData));
                    return resData;
                }                
            }
        } catch (err) {
            throw err;
        }
    }
    async FB_GetInfo_chi() {// 2.2.4.7
        const resData = await this.getData('/xml/index/FB_GetInfo_chi.xml');
        const { Coupons: { CouponInfo }, TournamentPools } = resData.AOSBS_XML;
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
                    let coupons_item = {};// 每场赛事
                    coupons_item.matches = [];// 比赛列表

                    const getPoolInfo = (PoolInfo, poolType='')=>{
                        PoolInfo.map((item3, index3) => {
                            if(item3.Pool == 'HFMP'){// 6宝半全场
                                getPoolInfo(item3.LegInfo, 'HFMP');
                            }else{// 普通类型
                                let matches_item ={};// 每场比赛

                                let pool = poolType||item3.Pool;
                                matches_item.league = item2.League;// 国家地区
                                matches_item.home = item2.Home;
                                matches_item.away = item2.Away;
                                matches_item.score_Home = item2.Progress.Result.split(':')[0];
                                matches_item.score_Away = item2.Progress.Result.split(':')[1];
                                matches_item.closeTime = item2.MatchPoolCloseTime + ' ' + item2.MatchPoolCloseDate;                                

                                matches_item.pool = pool;// 投注类型
                                matches_item.poolNum = PoolInfo.length;
                                matches_item.corner = item2.Progress.Corner;
                                matches_item.inplay = item2.Inplay;
                                matches_item.OddsSet  = [];// 每场比赛的投注池

                                item3.OddsSet = obj2Arr(item3.OddsSet);
                                item3.OddsSet.map((item4,index4)=>{
                                    let pools_item = {};// 每个投注项
                                    pools_item.enabled = item3.Enabled;
                                    pools_item.stopSell = item3.StopSell;
                                    pools_item.oddsInfo = [];// 每个投注项的赔率列表

                                    item4.OddsInfo = obj2Arr(item4.OddsInfo);
                                    item4.OddsInfo.map((item6,index6)=>{
                                        let oddsInfo_item = {};// 每种赔率详情
                                        if(pool=='HAD'){// 主客和
                                                if(item6.Number==1){// Home
                                                    oddsInfo_item.name = 'H';
                                                }else if(item6.Number=='X'){// D
                                                    oddsInfo_item.name = 'D';
                                                }else if(item6.Number==2){// Away
                                                    oddsInfo_item.name = 'A';
                                                }
                                                oddsInfo_item.odds = item6.Odds;
                                            // console.log(pool,index1+'_'+index2+'_'+index3+'_'+index4,matches_item)
                                        }else if(pool=='FHAD'){// 预测一场球赛的上半场赛果
                                            // no data
                                        }else if(pool=='HHAD'){// 较强之球队让球于较弱之球队
                                            // no data
                                        }else if(pool=='HDC'){// 投注经让球调整后之赛果
                                            if(item6.Number==1){// 
                                                matches_item[pool + '_title1'] = 'H';
                                                matches_item[pool + '_rate1'] = item6.Odds;
                                            }else if(item6.Number==2){// 
                                                matches_item[pool + '_title3'] = 'C';
                                                matches_item[pool + '_rate3'] = item6.Odds;
                                            }
                                        }else if(pool=='HFT'){// 预测球赛中半场(45分钟)及全场(90分钟)之主客和赛果

                                        }else if(pool=='TQL'){// 在指定赛事，投注哪队能晋级下一场赛事

                                        }else if(pool=='CRS'){// 预测球赛的正式比分

                                        }else if(pool=='FCS'){// 投注一场球赛法定时间上半场45分钟及上半场补时的比分

                                        }else if(pool=='TTG'){// 预测球赛中两队的入球个数

                                        }else if(pool=='OOE'){// 预测球赛中两队的入球个数为单数或双数

                                        }else if(pool=='HILO'){// 投注者可就一场球赛的入球个数高于或低于预判者所指定的数目(中位球数)下注

                                        }else if(pool=='FHL'){// 投注一场球赛的上半场入球个数，多于或少于指定的球数

                                        }else if(pool=='CHLO'){// 投注于指定球赛中，两队合共开出的角球个数*多于或少于指定的角球数

                                        }else if(pool=='PS'){// 不包括加时或互射12码后的赛果

                                        }else if(pool=='GPW'){// 投注分组阶段小组首名出线队伍

                                        }else if(pool=='GPF'){// 投注分组阶段小组的顺序首、次出线队伍

                                        }else if(pool=='TPS'){// 投注整个锦标赛射入最多入球的球员

                                        }else if(pool=='FGS'){// 投注一场球赛中最先射入对方球门得分的球员

                                        }else if(pool=='FTS'){// 投注哪队于法定时间(90分钟)获得第一个入球或无入球

                                        }else if(pool=='CP'){// 在指定赛事，投注哪队能赢得冠军

                                        }else if(pool=='DHCP'){// 预测两场球赛中板厂(45分钟)及全场(90分钟)的正式比分

                                        }else if(pool=='6FH'){// 6宝半全场

                                        }
                                        pools_item.oddsInfo.push(oddsInfo_item);
                                    })   
                                    matches_item.OddsSet.push(pools_item);                       
                                })

                                coupons_item.matches.push(matches_item);
                            }
                        })                        
                    }
                    getPoolInfo(item2.Pools.PoolInfo);
                    dataPerDay.coupons.push(coupons_item);
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
    async filterMatches(type) {
        const FB_GetInfo_chi = await this.FB_GetInfo_chi();
        const result = {
            dat:FB_GetInfo_chi.dat.map((item1,index1)=>{
                return {
                    title:item1.title,
                    data:item1.data.filter((item2,index2)=>{
                        // console.log(index1+'_'+index2,item2.pool,type,item2.pool==type)
                        return item2.poolType==type;
                    }),
                }
            }),
        }
        
        console.log(type,result)
        return result;
    }

}
export default new Api()
