
import Pools from '../Pools'
import { useCaseCache } from '../../config/project'
import { fetchData } from './fetchAndCacheData'
import { getLanguage } from '../../config/env'

const poolMap = {
    HAD: 'HDA',
    FHA: 'HDA',
    HHA: 'HDA',
    FTS: 'HNA',
    TQL: 'HA',
    OOE: 'EO',
    HDC: 'HA',
}

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
                const { data } = await fetchData('getJSON');
                this.cache.FB_GetInfo = data;
                const language = await getLanguage();
                this.curLg = language.slice(0, 2).toUpperCase();
            }
        } else {
            const { data } = await fetchData('getJSON');
            this.cache.FB_GetInfo = data;
            const language = await getLanguage();
            this.curLg = language.slice(0, 2).toUpperCase();
        }
        this.cache.FB_GetInfo = Object.values(this.cache.FB_GetInfo).map(item => {
            const matchDate = item.matchDate.split('+')[0].split('-');
            const matchMD = matchDate[1] + '/' + matchDate[2];
            item.date = matchMD + '(' + item.matchDay + ')';
            return item;
        });
        return this.cache.FB_GetInfo;
    }
    async getFilterMenu(initFB_GetInfo = null) {
        try {
            const resData = initFB_GetInfo || await this.initFB_GetInfo();
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
            // console.log('filterKeys',filterKeys)
            // get the all date
            const allDateInData = filterKeys.map(item => item.date);
            const dateList = [...new Set(allDateInData)].sort((a,b)=>{
                const getDate = (date)=>{
                    return new Date(date.split('(')[0]+'/'+new Date().getFullYear())
                }
                return getDate(a) - getDate(b);
            });
            // get the all league
            const allLeagueInData = filterKeys.map(item => item.league);
            const leagueList = [...new Set(allLeagueInData)].sort();
            // get the all pool
            const allPoolInData = filterKeys.reduce((sum, item) => {
                sum = sum.concat(item.pool);
                return sum;
            }, []);
            const poolListSet = [...new Set(allPoolInData)].sort();
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
            console.error(error)
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
            const { data: filterMenu } = await this.getFilterMenu(matchList);
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
                data: {
                    dateLeague: dateObj,
                    filterMenu,
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
    handleOddsInfo(pool, curOdds, curOddsInplay){
        let curGroup = {};
        let curOddsObj = {};
        let curOddsArr = [];
        if(pool == 'HIL' || pool == 'FHL' || pool == 'CHL'){
            curOddsArr = curOdds.LINELIST.map(item=>{
                let obj = {};
                Object.keys(item).map(key=>{
                    if(key == 'LINE'){
                        obj['I'] = item[key].split('/')[1];
                    }else if(key == 'H' || key == 'L'){
                        obj[key] = item[key].split('@')[1];
                    }
                })
                return {
                    enabled: Number(curOddsInplay),
                    ...obj,
                }
            })
        }else{
            Object.keys(curOdds).map(setKey => {
                switch (pool) {
                    case 'CRS':
                    case 'FCS':
                        curGroup[pool] = ['^S\\d{4}$', '^SM\\w{3}$'];// the count of grouping
                        curGroup[pool].map(item => {
                            curOddsObj[item] = curOddsObj[item] || {};
                            if (new RegExp(item).test(setKey)) {
                                const key = `${setKey.slice(1, 3)}:${setKey.slice(3)}`;
                                curOddsObj[item][key] = curOdds[setKey].slice(4)
                            }
                        })
                        break;

                    case 'TTG':
                        curGroup[pool] = ['^[A-Z]\\d$'];// the count of grouping
                        curGroup[pool].map(item => {
                            curOddsObj[item] = curOddsObj[item] || {};
                            if (new RegExp(item).test(setKey)) {
                                curOddsObj[item][`${setKey.slice(1)}`] = curOdds[setKey].slice(4);
                            }
                        })
                        break;

                    case 'HFT':
                        curGroup[pool] = ['^H[A-Z]$','^D[A-Z]$','^A[A-Z]$'];// the count of grouping
                        curGroup[pool].map(item => {
                            curOddsObj[item] = curOddsObj[item] || {};
                            if (new RegExp(item).test(setKey)) {
                                curOddsObj[item][ `${setKey.slice(1)}`] = curOdds[setKey].slice(4);
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
                        curGroup[pool] = [poolMap[pool]];// the count of grouping
                        curGroup[pool].map(item => {
                            // console.log(item,inPlay,curOddsInplay,curOddsObj)
                            curOddsObj[item] = curOddsObj[item] || {};
                            if (item.includes(setKey)) {
                                curOddsObj[item][setKey] = curOdds[setKey].slice(4);
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
                    enabled: Number(curOddsInplay),
                    ...curOddsObj[item],
                }
            })
        }
        return curOddsArr;
    }
    handleByInPlay(pool, curOdds, inPlay) {
        let curOddsArr = [];
        if(pool == 'NTS'){
            curOddsArr = curOdds.map(item=>{
                return {

                }
            })
        }else{
            const curOddsInplay = Number(JSON.parse(curOdds.INPLAY));// 'false'→0,'true'→1,
            if(inPlay){// inPlay == '0' || inPlay == '1'
                inPlay = inPlay ? JSON.parse(inPlay) : inPlay;// '0'→0,'1'→1,''→'',
                if(inPlay === curOddsInplay){// filter by inPlay
                    console.log('inplay',inPlay, curOddsInplay)
                    curOddsArr = this.handleOddsInfo(pool, curOdds, curOddsInplay)
                }else{// inPlay !== curOddsInplay

                }

            }else if(!inPlay || inPlay == 'undefined'){// return all inPlay, inPlay == '' || inPlay == 'undefined'
                console.log('全部',inPlay, curOddsInplay)
                curOddsArr = this.handleOddsInfo(pool, curOdds, inPlay)
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
    dateCouponsMatches(params,dateLeague){
        const { pool = 'HAD', date = '', league = '', inPlay = '' } = params;
        // console.log('filter',pool,date,league,inPlay,params)
        // filter by date
        if(date){
            dateLeague = {
                [date] : dateLeague[date]
            }
        }
        const filterResult = Object.keys(dateLeague).map(keyDate => {
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
                const finalPool = poolMap[pool] || pool;
                league_item.oddsNames = this.oddsInfoSort(finalPool.split(''));
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

                            matches_item.oddsSet = this.handleByInPlay(pool,curOdds,inPlay);
                            
                            if(matches_item.oddsSet.length){
                                league_item.matches.push(matches_item);
                            }else{
                                // the oddsSet is empty Array
                            }
                        }
                    })
                    if(league_item.matches.length){
                        date_item.coupons.push(league_item);
                    }else{
                        // the matches is empty Array
                    }
                }else{
                    // curDateLeagueData has no data
                }
            })
            return date_item;
        })
        return filterResult;
    }
    async filter(params) {// 筛选数据
        try {
            const res_dateLeague = await this.dateLeague();
            let { data: { dateLeague, filterMenu } } = JSON.parse(JSON.stringify(res_dateLeague))
            
            const filterResult = this.dateCouponsMatches(params,dateLeague);

            // console.log('过滤', {...params}, {...filterResult})
            return {
                ErrCode: 0,
                ErrMsg: '',
                data: {
                    matchList: filterResult,
                    ...filterMenu,
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
    async getAllPoolsData(args) {// 筛选数据
        try {
            const res_dateLeague = await this.dateLeague();
            let { data: { dateLeague, filterMenu, filterMenu: { poolList } } } = JSON.parse(JSON.stringify(res_dateLeague))
            let allPoolsData = {};
            if(args.pool){
                const params = { pool: args.pool, date: args.date || '', league: args.league || '', inPlay: String(args.inPlay) || '' };
                allPoolsData[args.pool] = this.dateCouponsMatches(params,dateLeague)
            }else{// return every pools
                Object.keys(poolList).map(item=>{
                    const params = { pool: item, date: args.date || '', league: args.league || '', inPlay: String(args.inPlay) || '' };
                    // console.log('args',{...args},'params',params)
                    allPoolsData[item] = this.dateCouponsMatches(params,dateLeague)
                }) 
            }        
            // console.log('过滤', {...params}, {...filterResult})
            return {
                ErrCode: 0,
                ErrMsg: '',
                data: {
                    ...allPoolsData,
                    ...filterMenu,
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
    async result(params) {// for result page
        try {
            const { pool = 'HAD', date = '', league = '', inPlay = '' } = params;
            const res_dateLeague = await this.dateLeague();
            let { data: dateLeague } = JSON.parse(JSON.stringify(res_dateLeague))
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
