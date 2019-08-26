
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
