global.fetch = require('node-fetch');
import api from '../../api'


// test('the data is filterMatches', async () => {
//     const data = await api.api.Matches.filter({
//         pool: 'HAD',
//         date: '',
//         league: '',
//     });
//     console.log('filterMatches________________',data)
//     expect(data).toBe('2')
// });

test('the data is poolsList', async () => {
    await api.Matches.filter({
        pool: 'HAD',
        date: '',
        league: '',
    });
    const data = api.Matches.poolList;
    // console.log('poolsList________________',data)
    expect(data['HAD']).toBe('Home/Away/Draw')
});