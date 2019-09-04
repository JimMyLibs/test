
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
        if (useCaseCache) {
            if (!this.cache.FB_GetInfo) {// 读取变量缓存数据
                this.cache.FB_GetInfo = await fetchData('getJSON');
                const language = await getLanguage();
                this.curLg = language.slice(0, 2).toUpperCase();
            }
        } else {
            this.cache.FB_GetInfo = await fetchData('getJSON');
            const language = await getLanguage();
            this.curLg = language.slice(0, 2).toUpperCase();
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
                    league: item.league['leagueName' + this.curLg],
                    pool: item.definedPools,
                }
            }).sort((a, b) => a.matchDate > b.matchDate);
            console.log('filterKeys',filterKeys)
            // get the all date
            const allDateInData = filterKeys.map(item => item.date);
            const dateList = [...new Set(allDateInData)];
            // get the all league
            const allLeagueInData = filterKeys.map(item => item.league);
            const leagueList = [...new Set(allLeagueInData)];
            // get the all pool
            const allPoolInData = filterKeys.reduce((sum, item) => {
                sum = sum.concat(item.pool);
                return sum;
            }, []);
            const poolListSet = [...new Set(allPoolInData)];
            let poolList = {};
            poolListSet.map(item => {
                poolList[item] = Pools.list[item];
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
        } catch (error) {
            return {
                ErrCode: 10001,
                ErrMsg: error.message,
                data: { error }
            }
        }
    }
    async getOriginalData() {
        let originData = await this.initFB_GetInfo();
        console.log('originData', originData)
        return {
            ErrCode: 0,
            ErrMsg: '',
            data: {
                originData,
            }
        };
    }
    async dateLeague(reverse = 0) {// 2.2.4.7  // 获取并编排所有数据
        try {
            const matchList = await this.initFB_GetInfo();
            // classify matchList by date
            let dateObj = {};
            matchList.map(item => {
                let matches_item = {};// 每场比赛

                {
                    // let pool = poolType || item3.Pool;
                    matches_item.key = item.matchID;// MatchID
                    matches_item.date = item.date;
                    matches_item.league = item.league['leagueName' + this.curLg];
                    matches_item.home = item.homeTeam['teamName' + this.curLg];
                    matches_item.away = item.awayTeam['teamName' + this.curLg];
                    matches_item.score_Home = item.livescore ? item.livescore.home : '';
                    matches_item.score_Away = item.livescore ? item.livescore.away : '';
                    matches_item.matchDateTime = item.matchTime;

                    // matches_item.pool = item.definedPools;// 投注类型
                    // matches_item.poolNum = item.definedPools.length;
                    matches_item.corner = item.cornerresult;
                    // matches_item.inPlay = item.inplayPools;
                    matches_item.webUrl = 'http://www.baidu.com/';
                    // matches_item.oddsSet = [];// 每场比赛的投注池
                    item.matches_item = matches_item;
                }

                let steps = [item.date, item.matches_item.league];
                if (reverse) { steps = steps.reverse() }
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
                data: { error }
            }
        }
    }
    handleOddsInfo(pool, curOdds, inPlay) {
        let curGroup = {};
        let curOddsObj = {};
        let curOddsArr = [];
        const curInplay = JSON.parse(curOdds.INPLAY);
        if(inPlay == curInplay){
            if(pool == 'HIL' || pool == 'FHL'){
                curOddsArr = curOdds.LINELIST.map(item=>{
                    let infoArr = [];
                    Object.keys(item).map(key=>{
                        if(['H','L','LINE'].includes(key)){
                            infoArr.push({
                                name: key == 'LINE' ? 'I' : key,
                                odds: item[key].slice(4),
                            })
                        }
                    })
                    return {
                        enabled: Number(curInplay),
                        oddsInfo: this.oddsInfoSort(infoArr),
                    }
                })
            }else{
                Object.keys(curOdds).map(setKey => {
                    switch (pool) {
                        case 'CRS':
                        case 'FCS':
                            curGroup[pool] = ['^S\\d{4}$', '^SM\\w{3}$'];// the count of grouping
                            curGroup[pool].map(item => {
                                curOddsObj[item] = curOddsObj[item] || [];
                                if (new RegExp(item).test(setKey)) {
                                    curOddsObj[item].push({
                                        name: `${setKey.slice(1, 3)}:${setKey.slice(3)}`,
                                        value: curOdds[setKey].slice(4),
                                    })
                                }
                            })
                            break;

                        case 'TTG':
                            curGroup[pool] = ['^[A-Z]\\d$'];// the count of grouping
                            curGroup[pool].map(item => {
                                curOddsObj[item] = curOddsObj[item] || [];
                                if (new RegExp(item).test(setKey)) {
                                    curOddsObj[item].push({
                                        name: `${setKey.slice(1)}`,
                                        value: curOdds[setKey].slice(4),
                                    })
                                }
                            })
                            break;

                        case 'HFT':
                            curGroup[pool] = ['^H[A-Z]$','^D[A-Z]$','^A[A-Z]$'];// the count of grouping
                            curGroup[pool].map(item => {
                                curOddsObj[item] = curOddsObj[item] || [];
                                if (new RegExp(item).test(setKey)) {
                                    curOddsObj[item].push({
                                        name: `${setKey.slice(1)}`,
                                        value: curOdds[setKey].slice(4),
                                    })
                                }
                            })
                            break;
                        
                        case 'HAD':
                        case 'FHA':
                        case 'HHA':
                        case 'FTS':
                        case 'TQL':
                        case 'OOE':
                        case 'HDC':
                            const hadMap = {
                                HAD: 'HDA',
                                FHA: 'HDA',
                                HHA: 'HDA',
                                FTS: 'HNA',
                                TQL: 'HA',
                                OOE: 'EO',
                                HDC: 'HA',
                            }
                            curGroup[pool] = [hadMap[pool]];// the count of grouping
                            curGroup[pool].map(item => {
                                curOddsObj[item] = curOddsObj[item] || [];
                                if (item.includes(setKey)) {
                                    curOddsObj[item].push({
                                        name: setKey,
                                        value: curOdds[setKey].slice(4),
                                    })
                                }
                            })
                            break;                                             

                        default:
                            console.log('default')
                            break;
                    }
                })
                curOddsArr = Object.keys(curOddsObj).map(item => {
                    return {
                        enabled: Number(curInplay),
                        oddsInfo: this.oddsInfoSort(curOddsObj[item]),
                    }
                })
            }
        }
        return curOddsArr;
    }
    oddsInfoSort (arr)  {// 赔率类型排序
        const rule = {H:50,D:60,N:60,A:70,I:80,L:90};
        return arr.sort((a,b)=>{
            if(a.name){
                return rule[a.name] - rule[b.name];
            }else{
                return rule[a] - rule[b];
            }
        })
    }
    async filter(params) {// 筛选数据
        try {
            const { pool = 'HAD', date = '', league = '', inPlay = '' } = params;
            if (useCaseCache) {
                if (!this.cache.dateLeague) {// 读取变量缓存数据
                    this.cache.dateLeague = await this.dateLeague();
                }
            } else {
                this.cache.dateLeague = await this.dateLeague();
            }
            let { data: dateLeague } = JSON.parse(JSON.stringify(this.cache.dateLeague))
            const filterResult = [];
            // filter by date
            if(date){
                dateLeague = {
                    [date] : dateLeague[date]
                }
            }
            Object.keys(dateLeague).map(keyDate => {
                let date_item = {};
                date_item.date = keyDate;
                date_item.coupons = [];
                Object.keys(dateLeague[keyDate]).map(keyLeague => {
                    // filter by leaguae
                    let cueDeteData = dateLeague[keyDate] || { [keyLeague]: [] };
                    let curDateLeagueData = cueDeteData[keyLeague];
                    if(league){
                        curDateLeagueData = cueDeteData[league] || []
                    }
                    let league_item = {};
                    league_item.league = league || keyLeague;
                    league_item.oddsNames = this.oddsInfoSort(pool.split(''));
                    league_item.matches = [];
                    if(curDateLeagueData.length){
                        curDateLeagueData.map(itemLeague => {
                            if (itemLeague.definedPools.includes(pool)) {
                                let matches_item = {};
                                matches_item = itemLeague.matches_item;
                                matches_item.pool = pool;
                                matches_item.poolNum = pool.length;
    
                                matches_item.oddsSet = [];
                                const curOddsName = pool.toLowerCase() + 'odds';
                                const curOdds = itemLeague[curOddsName];
    
                                matches_item.oddsSet = this.handleOddsInfo(pool,curOdds,inPlay);
    
                                league_item.matches.push(matches_item);
                            }
                        })
                        date_item.coupons.push(league_item);
                    }else{
                        date_item.coupons = [];
                    }
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
                data: { error }
            }
        }
    }
    async result(params) {// 筛选数据
        try {
            const { pool = 'HAD', date = '', league = '', inPlay = '' } = params;
            if (useCaseCache) {
                if (!this.cache.dateLeague) {// 读取变量缓存数据
                    this.cache.dateLeague = await this.dateLeague();
                }
            } else {
                this.cache.dateLeague = await this.dateLeague();
            }
            let { data: dateLeague } = JSON.parse(JSON.stringify(this.cache.dateLeague))
            const filterResult = [];
            // filter by date
            if(date){
                dateLeague = {
                    [date] : dateLeague[date]
                }
            }
            Object.keys(dateLeague).map(keyDate => {
                let date_item = {};
                date_item.date = keyDate;
                date_item.coupons = [];
                Object.keys(dateLeague[keyDate]).map(keyLeague => {
                    // filter by leaguae
                    let cueDeteData = dateLeague[keyDate] || { [keyLeague]: [] };
                    let curDateLeagueData = cueDeteData[keyLeague];
                    if(league){
                        curDateLeagueData = cueDeteData[league] || []
                    }
                    let league_item = {};
                    league_item.league = league || keyLeague;
                    league_item.oddsNames = ['HT','FT','ET'];
                    league_item.matches = [];
                    if(curDateLeagueData.length){
                        curDateLeagueData.map(itemLeague => {
                            if (itemLeague.definedPools.includes(pool)) {
                                let matches_item = {};
                                matches_item = itemLeague.matches_item;
                                matches_item.pool = pool;
                                matches_item.poolNum = pool.length;
    
                                
                                matches_item.scores = itemLeague.accumulatedscore.map(item=>{
                                    return {
                                        name: item.periodvalue == 'FirstHalf' ? 'HT' : 'FT',
                                        home: item.home,
                                        away: item.away,
                                    }
                                });
                                itemLeague.livescore&&matches_item.scores.push({
                                    name: 'ET',
                                    home: itemLeague.livescore.home,
                                    away: itemLeague.livescore.away,
                                })
                                
    
                                league_item.matches.push(matches_item);
                            }
                        })
                        date_item.coupons.push(league_item);
                    }else{
                        date_item.coupons = [];
                    }
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
                data: { error }
            }
        }
    }

}
export default new MatchByJson()
