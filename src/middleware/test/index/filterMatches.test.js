global.fetch = require('node-fetch');
import api from '../../api'


test('if pool==HAD,the pool of each item in the result of Matches.filter is HAD ?', async () => {
    const res = await api.Matches.filter({
        pool: 'HAD',
        date: '',
        league: '',
    });
    const poolsIsCorrect = res.data.matchList.every(item1=>{
        return item1.coupons.every(item2=>{
            return item2.matches.every(item3=>{
                return item3.pool === 'HAD';
            })
        })
    })
    expect(poolsIsCorrect).toBeTruthy()
});


// test('the data is poolsList·', async () => {
//     const data = api.Matches.poolList;
//     // console.log('poolsList________________',data)
//     expect(data['HAD']).toBe('Home/Away/Draw')
// });

// const houseForSale = {
//     bath: true,
//     bedrooms: 4,
//     amenities: ['oven', 'stove', 'washer'],
//     kitchen: {
//         amenities: ['oven', 'stove', 'washer'],
//         area: 20,
//         wallColor: 'white',
//     },
// };
// const desiredHouse = {
//     bath: true,
//     amenities: ['oven', 'stove', 'washer'],
//     kitchen: {
//         wallColor: expect.stringMatching(/white|yellow/),
//     },
// };

// test('the house has my desired features', () => {
//     expect(houseForSale).toMatchObject(desiredHouse);
// });