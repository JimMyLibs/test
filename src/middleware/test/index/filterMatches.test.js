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
    const data = await api.Matches.poolList;
    console.log('poolsList________________',data)
    expect(data).toBe('2')
});