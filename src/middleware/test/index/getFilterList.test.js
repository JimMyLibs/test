global.fetch = require('node-fetch');
import api from '../../api'

let filterList = {};
beforeAll(async () => {
    const { data } = await api.Matches.getFilterMenu();
    filterList = data;
    return filterList;
});


describe('begin to test filterList', () => {
    test('test poolsList', () => {
        const { poolList, leagueList, dateList } = filterList;
        const expectData = {
            HAD: "Home/Away/Draw"
        }
        expect(poolList).toMatchObject(expectData)
    });
    test('test dateList', () => {
        const { poolList, leagueList, dateList } = filterList;
        const reg_date = /^\d{1,2}\/\d{1,2}\([A-Z]{3}\)$/;// 08/10(THU)
        dateList.map((item,index)=>{
            // if(index==3){ item = item+'-' }// make a wrong item
            expect(item).toMatch(reg_date)
        })
    });
    test('test leagueList', () => {
        const { poolList, leagueList, dateList } = filterList;
        const reg_league = /^[\u4e00-\u9fa5]{1,}$|^[a-zA-Z]+$/;// 歐洲國家盃 || abc
        leagueList.map((item,index)=>{
            // if(index==3){ item = item+'-' }// make a wrong item
            expect(item).toMatch(reg_league)
        })
    });
})

