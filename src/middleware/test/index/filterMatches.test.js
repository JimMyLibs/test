global.fetch = require('node-fetch');
import api from '../../api'


let filterList = {
    dateList: [],
    leagueList: [],
    poolList: [],
};
let params = {
    pool: '',
    date: '',
    league: '',
}
let result = {};
beforeAll(async () => {
    const { data } = await api.Matches.getFilterMenu();
    filterList.dateList = ['',...data.dateList];
    filterList.leagueList = ['',...data.leagueList];
    filterList.poolList = ['',...Object.keys(data.poolList)];
    let getRandom = (num=>{
        return Math.floor(Math.random()*num)
    })
    params = {
        pool: filterList.poolList[getRandom(filterList.poolList.length)],
        date: filterList.dateList[getRandom(filterList.dateList.length)],
        league: filterList.leagueList[getRandom(filterList.leagueList.length)],
    }
    result = await api.Matches.filter(params);
});


describe('begin to test filterMatch result ', () => {
    test(`when the params is ${JSON.stringify(params)} ,the result is all right?`,()=>{
        console.log(`when the params is ${JSON.stringify(params)} ,the result is all right?`);
        const allIsCorrect = result.data.matchList.every(item1 => {
            const dateIsAllOK = item1.date ? params.date === item1.date : true;
            const leagueIsAllOK =  item1.coupons.every(item2 => {
                return item2.league ? params.league === item2.league : true;
            })
            const poolIsAllOK =  item1.coupons.every(item2 => {
                return item2.matches.every(item3 => {
                    return item3.pool === params.pool;
                })
            })
            return dateIsAllOK && leagueIsAllOK && poolIsAllOK;
        })
        expect(allIsCorrect).toBeTruthy()
    })
})