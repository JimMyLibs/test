
import Pools from '../Pools'
import { useCaseCache } from '../../config/project'
import { fetchData } from './fetchAndCacheData'

class MatchByJson {
    constructor() {
        this.cache = {
            datePools: 0,// datePools数据
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
            // classify matchList by date
            let dateObj = {};
            matchList.map(item=>{
                let steps = [item.date,item.league.leagueShortName];
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
        const { pool = '', date = '', league = '' } = params;
        if(useCaseCache){
            if (!this.cache.datePools) {// 读取变量缓存数据
                this.cache.datePools = await this.datePools();
            }
        }else{
            this.cache.datePools = await this.datePools();
        }
        const datePools = JSON.parse(JSON.stringify(this.cache.datePools))
        const filterResult = [];
        datePools.data.map(item => {
            if (pool) {
                const filterPoolData = item[pool].filter((item2, index2) => {
                    item2.matches.map((item3, index3) => {
                        if ((index2 + index3) < 3) {
                            item3.webUrl = 'https://wwww.baidu.com/'
                        }
                    })
                    return league ? item2.league == league : true;// league为空时取全部
                })
                // console.log(pool, filterPoolData)
                if (date) {
                    if (item.date == date) {
                        filterResult.push({
                            date: item.date,
                            coupons: filterPoolData || [],
                        })
                    }
                } else {// date为空时取全部
                    filterResult.push({
                        date: item.date,
                        coupons: filterPoolData || [],
                    })
                }
            } else {
                return item;
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
    }

}
export default new MatchByJson()
