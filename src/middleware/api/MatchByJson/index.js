
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
            FB_GetInfo: 0,
            filterMenu: {},
            params: { pool: '', date: '', leagua: '', inPlay: '' },
        }
    }
    async initFB_GetInfo() {
        if (useCaseCache) {
            if (!this.cache.FB_GetInfo) {// 读取变量缓存数据
                const { data } = await fetchData(this.cache.params);
                this.cache.FB_GetInfo = data;
                const language = await getLanguage();
                this.curLg = language.slice(0, 2).toUpperCase();
            }
        } else {
            const { data } = await fetchData(this.cache.params);
            this.cache.FB_GetInfo = data;
            const language = await getLanguage();
            this.curLg = language.slice(0, 2).toUpperCase();
        }
        this.cache.FB_GetInfo = Object.values(this.cache.FB_GetInfo).map(item => {
            const ymd = new Date(item.matchDate.split('+')[0]);
            const matchMD = ymd.getMonth()+1 + '/' + ymd.getDate();
            item.date = matchMD + '(' + item.matchDay + ')';
            return item;
        }).filter(item=>item.matchStatus !== 'ResultIn').sort((a,b)=>new Date(a.matchTime)-new Date(b.matchTime));
        this.cache.filterMenu = await this.getFilterMenu();
        return this.cache.FB_GetInfo;
    }
    async getFilterMenu() {
        try {
            const matchList = this.cache.FB_GetInfo;
            // get the conditions for filtering
            const filterKeys = matchList.map(item => {
                return {
                    matchTime: item.matchTime,
                    date: item.date,
                    league: item.league['leagueName' + this.curLg],
                    pool: item.definedPools,
                }
            })
            // console.log('filterKeys',filterKeys)
            
            // get the all date
            const allDateInData = filterKeys.map(item => item.date);
            const dateList = [...new Set(allDateInData)];

            // get the all league
            const allLeagueInData = filterKeys.map(item => item.league);
            const leagueList = [...new Set(allLeagueInData)].sort();

            // // get the all pool
            const allPoolInData = filterKeys.reduce((sum, item) => {
                sum = sum.concat(item.pool);
                return sum;
            }, []);
            const poolListSet = [...new Set(allPoolInData)];
            let poolList = {};
            poolListSet.map(item => {
                poolList[item] = Pools.list[item];
            })
            return { dateList, leagueList, poolList };
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
        // console.log('originData', originData)
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
                    matches_item.title = item.date;
                    matches_item.league = item.league['leagueName' + this.curLg];
                    matches_item.home = item.homeTeam['teamName' + this.curLg];
                    matches_item.away = item.awayTeam['teamName' + this.curLg];
                    matches_item.score_Home = item.livescore ? item.livescore.home : 0;
                    matches_item.score_Away = item.livescore ? item.livescore.away : 0;
                    // matches_item.matchYMD = item.matchTime.split('+')[0];
                    matches_item.matchDateTime = item.matchTime.split('T')[1].split('+')[0] + ' ' + item.date;

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
                    filterMenu: this.cache.filterMenu,
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
    handleOddsInfo(pool, curOdds){
        try {
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
                                // console.log(item,inPlay,curOddsObj)
                                curOddsObj[item] = curOddsObj[item] || {};
                                if (item.includes(setKey)) {
                                    curOddsObj[item][setKey] = curOdds[setKey].slice(4);
                                }
                            })
                            break;                                             
    
                        default:
                            console.log('default',pool)
                            break;
                    }
                })
                curOddsArr = Object.keys(curOddsObj).map(item => {
                    return {
                        ...curOddsObj[item],
                    }
                })
            }
            return curOddsArr;            
        } catch (error) {
            console.error(error)
            return {
                ErrCode: 10001,
                ErrMsg: error.message,
                data: { error }
            }                
        }
    }
    handleByInPlay(pool, curOdds, inPlay) {
        try {
            let curOddsArr = [];
            if(pool == 'NTS'){
                curOddsArr = curOdds.map(item=>{
                    return {
    
                    }
                })
            }else{
                const curOddsInplay = Number(JSON.parse(curOdds.INPLAY));// 'false'→0,'true'→1,
                if(inPlay === 0 || inPlay === 1){// inPlay == 0 || inPlay == 1
                    if(inPlay === curOddsInplay){// filter by inPlay
                        curOddsArr = this.handleOddsInfo(pool, curOdds)
                    }else{// inPlay !== curOddsInplay
    
                    }    
                }else{// return all inPlay, inPlay == '' || inPlay == undefined
                    curOddsArr = this.handleOddsInfo(pool, curOdds)
                }
            }
            return curOddsArr;            
        } catch (error) {
            console.error(error)
            return {
                ErrCode: 10001,
                ErrMsg: error.message,
                data: { error }
            }               
        }
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
        try {
            const { pool, date, league, inPlay, search } = params;
            // console.log('filter',pool,date,league,inPlay,search,params)
            // filter by date
            if(date){
                dateLeague = {
                    [date] : dateLeague[date]
                }
            }
            let filterResult = [];
            let dateList = [];
            let leagueList = [];
            Object.keys(dateLeague).map(keyDate => {
                let date_item = {};
                date_item.title = keyDate;
                date_item.data = [];
                Object.keys(dateLeague[keyDate]).map(keyLeague => {
                    // filter by leagua
                    let cueDeteData = dateLeague[keyDate] || { [keyLeague]: [] };
                    let curDateLeagueData = cueDeteData[keyLeague];
                    if(league){
                        curDateLeagueData = cueDeteData[league] || []
                    }
                    let league_item = { title: {} };
                    league_item.title.league = league || keyLeague;                 
                    const finalPool = poolMap[pool] || pool;
                    league_item.title.oddsNames = this.oddsInfoSort(finalPool.split(''));
                    league_item.data = [];
                    if(curDateLeagueData.length){
                        curDateLeagueData.map(itemLeague => {
                            if (itemLeague.definedPools.includes(pool)) {
                                let matches_item = {};
                                matches_item = itemLeague.matches_item;
                                matches_item.pool = pool;
                                matches_item.poolNum = pool.length;
    
                                const curOddsName = pool.toLowerCase() + 'odds';
                                const curOdds = itemLeague[curOddsName];    
                                matches_item.inPlay = inPlay;   

                                matches_item.oddsSet = [];
                                if(curOdds){
                                    matches_item.oddsSet = this.handleByInPlay(pool,curOdds,inPlay);  
                                }else{
                                    // console.log(curOddsName,"doesn't exist, which from",matches_item.key)
                                }
                                if(matches_item.oddsSet.length){
                                    league_item.data.push(JSON.parse(JSON.stringify(matches_item)));
                                }else{
                                    // the oddsSet is empty Array
                                }
                            }
                        })
                        if(league_item.data.length){
                            date_item.data.push(league_item);
                        }else{
                            // the data is empty Array
                        }
                    }else{
                        // curDateLeagueData has no data
                    }
                })
                if(date_item.data.length){
                    filterResult.push(date_item);
                }else{
                    // this data(coupons) has no data
                }
            })
            // search
            if(search){
                filterResult = this.search(search, filterResult);
            }
            // filter by date
            if(search && !date){// filter by date, return all dateList
                dateList = filterResult.map(item=>item.title);
            }else{
                dateList = this.cache.filterMenu.dateList;
            }         
            // filter by league   
            if(search && !league){// filter by league, return all leagueList
                const leaguaAllList = filterResult.map(item=>item.data.map(item2=>item2.title.league)).reduce((sum,item)=>{
                    sum = [...sum,...item]
                    return sum;
                },[]);
                leagueList = [...new Set(leaguaAllList)].sort();
            }else{
                leagueList = this.cache.filterMenu.leagueList;
            }
            return {
                leagueList,
                dateList,
                matchList: filterResult,
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
    search(keyWords, matchList) {// seach from matchList, only return matchlist
        try {
            if(keyWords){
                return matchList.filter(item_date=>{
                    return item_date.data.map(item_league=>{
                        item_league.data = item_league.data.filter(item_match=>{
                            return JSON.stringify(Object.values(item_match)).includes(keyWords);
                        });
                        return item_league;
                    }).length;
                }).map(item_date=>{
                    item_date.data = item_date.data.filter(item_league=>item_league.data.length)
                    return item_date;
                }).filter(item_date=>item_date.data.length);
            }else{
                return matchList;
            }
        } catch (error) {
            console.error(error)
            return matchList;
        }
    }
    async getAllPoolsData(args = { pool: '', date: '', leagua: '', inPlay: '', search: '', matchList: '' }) {// get all data of each pool
        this.cache.params = args;// used to select the origin for requesting
        let allPoolsData = {};
        try {
            const res_dateLeague = await this.dateLeague();
            let { data: { dateLeague, filterMenu, filterMenu: { poolList } } } = JSON.parse(JSON.stringify(res_dateLeague))

            if(args.search&&args.matchList){// only serch
                allPoolsData[args.pool] = this.search(args.search, args.matchList);
            }else{// others
                if(args.pool){// only current pool data
                    allPoolsData[args.pool] = this.dateCouponsMatches(args,dateLeague)
                }else{// return every pools
                    Object.keys(poolList).map(item=>{
                        const params = { ...args, pool: item };
                        // console.log('args',{...args},'params',params)
                        allPoolsData[item] = this.dateCouponsMatches(params,dateLeague)
                    }) 
                }        
                // console.log('过滤', {...params}, {...filterResult})
            }
            return {
                ErrCode: 0,
                ErrMsg: '',
                data: {
                    ...allPoolsData,
                    // ...filterMenu,
                    poolList,
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
            let { data: { dateLeague } } = JSON.parse(JSON.stringify(res_dateLeague))
            const filterResult = [];
            // filter by date
            if(date){
                dateLeague = {
                    [date] : dateLeague[date]
                }
            }
            Object.keys(dateLeague).map(keyDate => {
                let date_item = {};
                date_item.title = keyDate;
                date_item.data = [];
                Object.keys(dateLeague[keyDate]).map(keyLeague => {
                    // filter by leagua
                    let cueDeteData = dateLeague[keyDate] || { [keyLeague]: [] };
                    let curDateLeagueData = cueDeteData[keyLeague];
                    if(league){
                        curDateLeagueData = cueDeteData[league] || []
                    }
                    let league_item = {};
                    league_item.league = league || keyLeague;
                    league_item.oddsNames = ['HT','FT','ET'];
                    league_item.data = [];
                    if(curDateLeagueData.length){
                        curDateLeagueData.map(itemLeague => {
                            if (itemLeague.definedPools.includes(pool)) {
                                let matches_item = {};
                                matches_item = itemLeague.matches_item;
                                matches_item.pool = pool;
                                matches_item.poolNum = pool.length;    
                                matches_item.scores = itemLeague.accumulatedscore&&itemLeague.accumulatedscore.map(item=>{
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
                                
    
                                league_item.data.push(matches_item);
                            }
                        })
                        date_item.data.push(league_item);
                    }else{
                        date_item.data = [];
                    }
                })
                if(date_item.data.length){
                    console.log(date_item.title,date_item.data.length)
                    filterResult.push(date_item);
                }else{
                    console.log(2,date_item.title,date_item.data.length)
                    // this data(coupons) has no data
                }
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
