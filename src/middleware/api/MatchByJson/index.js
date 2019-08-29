
import Pools from '../Pools'
import { useCaseCache } from '../../config/project'
import { fetchData } from './fetchAndCacheData'
import { getLanguage } from '../../config/env'

class MatchByJson {
    constructor() {
        this.cache = {
            dateLeague: 0,// dateLeague数据
            FB_GetInfo: 0,
        }
    }
    async initFB_GetInfo() {
        if(useCaseCache){
            if (!this.cache.FB_GetInfo) {// 读取变量缓存数据
                this.cache.FB_GetInfo = await fetchData('getJSON');
            }
        }else{
            this.cache.FB_GetInfo = await fetchData('getJSON');
        }
        this.cache.FB_GetInfo = Object.values(this.cache.FB_GetInfo.data).map(item => {
            const matchDate = item.matchDate.split('+')[0].split('-');
            const matchMD = matchDate[1] + '/' + matchDate[2];
            item.date = matchMD + '(' + item.matchDay + ')';
            return item;
        });
        return this.cache.FB_GetInfo;
    }
    async getFilterMenu() {
        try {
            const resData = await this.initFB_GetInfo();
            const matchList = Object.values(resData).map(item => {
                const matchDate = item.matchDate.split('+')[0].split('-');
                const matchMD = matchDate[1] + '/' + matchDate[2];
                item.date = matchMD + '(' + item.matchDay + ')';
                return item;
            });
            // get the conditions for filtering
            const filterKeys = matchList.map(item => {
                return {
                    matchDate: item.matchDate,
                    matchDay: item.matchDay,
                    date: item.date,
                    league: item.league.leagueShortName,
                    pool: item.definedPools,
                }
            }).sort((a, b) => a.matchDate > b.matchDate);
            // get the all date
            const allDateInData = filterKeys.map(item => item.date);
            const dateList = [...new Set(allDateInData)];
            // get the all league
            const allLeagueInData = filterKeys.map(item => item.league);
            const leagueList = [...new Set(allLeagueInData)];
            // get the all pool
            const allPoolInData = filterKeys.reduce((sum,item) => {
                sum = sum.concat(item.pool);
                return sum;
            },[]);
            const poolListSet = [...new Set(allPoolInData)];
            let poolList = {};
            poolListSet.map(item=>{
                poolList[item] = Pools.list[item];
            })
            return {
                ErrCode: 0,
                ErrMsg: '',
                data:{
                    poolList,
                    dateList,
                    leagueList,
                }
            }
        } catch (error) {
            return {
                ErrCode: 10001,
                ErrMsg: error.message,
                data:{ error }
            }
        }
    }
    async getOriginalData() {
        let originData = await this.initFB_GetInfo();
        console.log('originData',originData)
        return {
            ErrCode: 0,
            ErrMsg: '',
            data:{
                originData,
            }
        };
    }
    async dateLeague ( reverse = 0 ) {// 2.2.4.7  // 获取并编排所有数据
        try {
            const matchList = await this.initFB_GetInfo();
            const language = await getLanguage();
            const curLg = language.slice(0,2).toUpperCase();
            // classify matchList by date
            let dateObj = {};
            matchList.map(item=>{
                let matches_item = {};// 每场比赛

                {
                    // let pool = poolType || item3.Pool;
                    matches_item.key = item.matchID;// MatchID
                    matches_item.date = item.date;
                    matches_item.league = item.league['leagueName'+curLg];
                    matches_item.home = item.homeTeam['teamName'+curLg];            
                    matches_item.away = item.awayTeam['teamName'+curLg];
                    matches_item.score_Home = item.livescore? item.livescore.home : '';
                    matches_item.score_Away = item.livescore? item.livescore.away : '';
                    matches_item.matchDateTime = item.matchTime;
    
                    // matches_item.pool = item.definedPools;// 投注类型
                    // matches_item.poolNum = item.definedPools.length;
                    matches_item.corner = item.cornerresult;
                    // matches_item.inPlay = item.inplayPools;
                    matches_item.webUrl = 'http://www.baidu.com/';
                    // matches_item.oddsSet = [];// 每场比赛的投注池
                    item.matches_item = matches_item;
                }

                let steps = [item.date,item.matches_item.league];
                if(reverse){ steps = steps.reverse() }
                dateObj[steps[0]] = dateObj[steps[0]] || {};
                dateObj[steps[0]][steps[1]] = dateObj[steps[0]][steps[1]] || [];
                dateObj[steps[0]][steps[1]].push(item);
            })
            return {
                ErrCode: 0,
                ErrMsg: '',
                data: dateObj,
            };
        } catch (error) {
            return {
                ErrCode: 10001,
                ErrMsg: error.message,
                data:{ error }
            }
        }
    }
    handleOddsInfo (pool,item6) {    
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
                if (item6.Number.includes('1-')) {// Home
                    oddsInfo_item.name = 'H';
                } else if (item6.Number.includes('X-')) {// D
                    oddsInfo_item.name = 'D';
                } else if (item6.Number.includes('2-')) {// Away
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
    async filter(params) {// 筛选数据
        try {
            const { pool = 'HAD', date = '', league = '', inPlay = '' } = params;
            if(useCaseCache){
                if (!this.cache.dateLeague) {// 读取变量缓存数据
                    this.cache.dateLeague = await this.dateLeague();
                }
            }else{
                this.cache.dateLeague = await this.dateLeague();
            }
            const { data: dateLeague } = JSON.parse(JSON.stringify(this.cache.dateLeague))
            const filterResult = [];
            Object.keys(dateLeague).map(keyDate=>{
                let date_item = {};
                date_item.date = keyDate;
                date_item.coupons = [];
                Object.keys(dateLeague[keyDate]).map(keyLeague=>{
                    let league_item = {};
                    league_item.league = keyLeague;
                    league_item.oddsNames = pool.split('');
                    league_item.matches = [];
                    dateLeague[keyDate][keyLeague].map(itemLeague=>{
                        if(itemLeague.definedPools.includes(pool)){
                            let matches_item = {};
                            matches_item = itemLeague.matches_item;
                            matches_item.pool = pool;
                            matches_item.poolNum = pool.length;
                            matches_item.oddsSet = {};
                            const curOdds = pool.toLowerCase()+'odds';
                            matches_item.oddsSet.enabled = Number(JSON.parse(itemLeague[curOdds].INPLAY));
                            matches_item.oddsSet.oddsInfo = [];
                            Object.keys(itemLeague[curOdds]).map(keyOdds=>{
                                if(pool.includes(keyOdds)){
                                    matches_item.oddsSet.oddsInfo.push({
                                        name: keyOdds,
                                        value: itemLeague[curOdds][keyOdds],
                                    })
                                }
                            })
                            league_item.matches.push(matches_item);                            
                        }
                    })
                    date_item.coupons.push(league_item);
                })
                filterResult.push(date_item);
            })
            
            // console.log('过滤', {...params}, {...filterResult})
            return {
                ErrCode: 0,
                ErrMsg: '',
                data: {
                    matchList: filterResult
                },
            };
            
        } catch (error) {
            console.error(error)
            return {
                ErrCode: 10001,
                ErrMsg: error.message,
                data:{ error }
            }            
        }
    }

}
export default new MatchByJson()
