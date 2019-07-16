
import { obj2Arr } from '../../utils/utils'
import { fetchData } from './fetchAndCacheData'


const oddsInfoSort = (arr)=> {// 赔率类型排序
    const rule = {H:50,D:60,A:70,I:80,L:90};
    return arr.sort((a,b)=>{
        return rule[a.name] - rule[b.name];
    })
}
const handleOddsInfo = (pool,item6)=>{    
    let oddsInfo_item = {};// 每种赔率详情
    oddsInfo_item.odds = item6.Odds;
    switch(pool){
        case 'HAD' || 'FHA' || 'HHA':// 主客和 || 上半场主客和 || 让球主客和
            if (item6.Number == 1) {// Home
                oddsInfo_item.name = 'H';
            } else if (item6.Number == 'X') {// D
                oddsInfo_item.name = 'D';
            } else if (item6.Number == 2) {// Away
                oddsInfo_item.name = 'A';
            }
            break;
        case 'HDC':// 投注经让球调整后之赛果
            if (item6.Number == 1) {
                oddsInfo_item.name = 'H';
            } else if (item6.Number == 'X') {
                oddsInfo_item.name = 'D';
            } else if (item6.Number == 2) {
                oddsInfo_item.name = 'C';
            }
            break;
        case 'HFT':// 预测球赛中半场(45分钟)及全场(90分钟)之主客和赛果
            if (item6.Number == '1-1') {// Home
                oddsInfo_item.name = 'H';
            } else if (item6.Number == 'X-1') {// D
                oddsInfo_item.name = 'D';
            } else if (item6.Number == '2-1') {// Away
                oddsInfo_item.name = 'A';
            }
            break;
        case 'HIL' || 'FHL' || 'CHL':// High Low : OddsInfo.length==2
            oddsInfo_item.name = item6.Number;
            break;
        case 'PS':// 不包括加时或互射12码后的赛果
            // no data
            break;
        case 'GPW':// 投注分组阶段小组首名出线队伍
            // 分组
            break;
        case 'GPF':// 投注分组阶段小组的顺序首、次出线队伍
            // 分组
            break;
        case 'TPS':// 投注整个锦标赛射入最多入球的球员
            // 分组
            break;
        case 'CP':// 在指定赛事，投注哪队能赢得冠军
            // no data
            break;
        case 'DHCP':// 预测两场球赛中板厂(45分钟)及全场(90分钟)的正式比分
            // no data
            break;
        case '6FH':// 6宝半全场
            // no data
            break;
        default:// 普通类型
            switch(pool){
                case 'TQL':// 在指定赛事，投注哪队能晋级下一场赛事
                    break;                                        
                case 'CRS':// 预测球赛的正式比分
                    break;                                        
                case 'FCS':// 投注一场球赛法定时间上半场45分钟及上半场补时的比分
                    break;                                        
                case 'TTG':// 预测球赛中两队的入球个数
                    break;                                        
                case 'OOE':// 预测球赛中两队的入球个数为单数或双数
                    break;                                
                case 'FGS':// 投注一场球赛中最先射入对方球门得分的球员
                    break;                                
                case 'FTS':// 投注哪队于法定时间(90分钟)获得第一个入球或无入球
                    break;                                
            }
            oddsInfo_item.name = item6.Number;
            oddsInfo_item.odds = item6.Odds;

    }
    return oddsInfo_item;
}
const particularAddLine = (pool,item4)=>{// 个别玩法添加均线
    // 个别类型的OddsInfo需要提前处理一下
    if (pool == 'HIL' || pool == 'FHL' || pool == 'CHL') {// 投注者可就一场球赛的入球个数高于或低于预判者所指定的数目(中位球数)下注
        const lineObj = {
            "Number": "I",
            "Odds": item4.MainLine*1+0.5,
            "Enabled": "",
            "Condition": "",
            "Value": ""
        }
        item4.OddsInfo[2] = lineObj;
    }
}
export const FB_GetInfo_chi = async ()=> {// 2.2.4.7  // 获取并编排所有数据
    const resData = await fetchData('FB_GetInfo_chi');
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
                            matches_item.key = item2.MatchID;// 比赛ID
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
                            matches_item.webUrl = ''
                            matches_item.oddsSet = [];// 每场比赛的投注池

                            item3.OddsSet = obj2Arr(item3.OddsSet);
                            item3.OddsSet.map((item4, index4) => {
                                let pools_item = {};// 每个投注项
                                pools_item.enabled = item3.Enabled;
                                pools_item.oddsUpdateTime = item3.OddsUpdateTime;// 更新时间
                                pools_item.stopSell = item3.StopSell;// 停售时间
                                pools_item.oddsInfo = [];// 每个投注项的赔率列表

                                item4.OddsInfo = obj2Arr(item4.OddsInfo);
                                particularAddLine(pool,item4);// 个别玩法添加均线
                                item4.OddsInfo.map((item6, index6) => {
                                    const oddsInfo_item = handleOddsInfo(pool,item6);// 处理oddsInfo
                                    pools_item.oddsInfo.push(oddsInfo_item);
                                })
                                // console.log(index4,'pools_item.oddsInfo',pools_item.oddsInfo)
                                pools_item.oddsInfo = oddsInfoSort(pools_item.oddsInfo);// 排序
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

        return {
            result,
            CouponInfo,
            TournamentPoolInfo
            // result：初始化FB_GetInfo_chi:: 89ms && 处理数据datePools:: 90ms
            // result&&CouponInfo&&TournamentPoolInfo: 初始化FB_GetInfo_chi:: 169ms && 处理数据datePools:: 580ms
        };
    } catch (err) {
        console.error(err);
        return err.message;
    }
}