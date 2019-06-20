import { $post, $get } from '../../fetch/Http'
import { obj2Arr } from '../../utils/utils'
import menu from './menu'

const reqDates = ['0530', '0612', 'xml'];
export const curDate = reqDates[2];

class Api {
    constructor() {
        this.menu = menu;
        this.tmp = {};
    }
    async getData(name) {
        try {
            const LSdata = window.localStorage?localStorage.getItem(name):false;
            if (LSdata) {
                return JSON.parse(LSdata);// 100ms
            } else {
                const resData = await $get(`${curDate}/${name}`);// 300ms
                window.localStorage&&localStorage.setItem(name, JSON.stringify(resData));
                return resData;
            }
        } catch (err) {
            throw err;
        }
    }
    async FB_GetInfo_chi() {// 2.2.4.7
        const resData = await this.getData('FB_GetInfo_chi.xml');
        const { Coupons: { CouponInfo }, TournamentPools } = resData.AOSBS_XML;
        let result = { dat: [] };
        try {
            CouponInfo.map((item1, index1) => {
                // Jim@2019-06-17 17:43:23：fix xml2json bug
                let { Matches: { MatchInfo } } = item1;
                MatchInfo = obj2Arr(MatchInfo);
                // get title
                let d_item = {};
                result.dat[index1] = d_item;
                d_item.title = `${MatchInfo[0] ? MatchInfo[0].Date : ''}(${item1.NameShort})`;
                d_item.data = [];            
                // console.log(index1,item1)
                MatchInfo.map((item2, index2) => {
                    // console.log(index1+'_'+index2, item2.Pools.PoolInfo)
                    const getPoolInfo = (PoolInfo, PoolType='')=>{
                        PoolInfo.map((item3, index3) => {
                            if(item3.Pool == 'HFMP'){// 6宝半全场
                                getPoolInfo(item3.LegInfo, 'HFMP');
                            }else{// 普通类型
                                let d_d_item = {};
                                // 处理赔率（三级）
                                item3.OddsSet = obj2Arr(item3.OddsSet);
                                // console.log(index1+'_'+index2+'_'+index3,PoolType||item3.Pool,item3.OddsSet)
                                item3.OddsSet.map((item4,index4)=>{
                                    d_d_item.rate1_title = '';
                                    d_d_item.rate2_title = '';
                                    d_d_item.rate3_title = '';
                                    d_d_item.rate1_num = '';
                                    d_d_item.rate2_num = '';
                                    d_d_item.rate3_num = '';

                                    d_d_item[item3.Pool + '_title' + (index4+1)] = item4.Tag;

                                    d_d_item.pool = PoolType || item3.Pool;
                                    d_d_item.corner = item2.Progress.Corner;
                                    d_d_item.tab_title = '';
                                    d_d_item.tab_num = '';
                                })
                                // 处理玩法（二级）
                                d_d_item.div = item2.League;
                                d_d_item.team1 = item2.Home;
                                d_d_item.team2 = item2.Away;
                                d_d_item.score1 = item2.Progress.Result.split(':')[0];
                                d_d_item.score2 = item2.Progress.Result.split(':')[1];
                                d_d_item.timing = item2.MatchPoolCloseTime + ' ' + item2.MatchPoolCloseDate;
                                result.dat[index1].data.push(d_d_item);
                            }
                        })                        
                    }
                    getPoolInfo(item2.Pools.PoolInfo);
                })
            })

            this.tmp.CouponInfo = CouponInfo;
            return result;
        } catch (err) {
            console.error(err);
            return err.message;
        }
    }
    async getMatches(type) {
        const FB_GetInfo_chi = await this.FB_GetInfo_chi();
        const result = {
            dat:FB_GetInfo_chi.dat.map((item1,index1)=>{
                return {
                    title:item1.title,
                    data:item1.data.filter((item2,index2)=>{
                        // console.log(index1+'_'+index2,item2.pool,type,item2.pool==type)
                        return item2.pool==type;
                    }),
                }
            }),
        }
        
        console.log(type,result)
        return result;
    }

}
export default new Api()
