global.fetch = require('node-fetch');
import api from '../../api'


test('if pool==HAD,the pool of each item in the result of Matches.filter is HAD ?', async () => {
    const res = await api.Matches.filter({
        pool: 'HAD',
        date: '',
        league: '',
    });
    const poolsIsCorrect = res.data.matchList.every(item1 => {
        return item1.coupons.every(item2 => {
            return item2.matches.every(item3 => {
                return item3.pool === 'HAD';
            })
        })
    })
    expect(poolsIsCorrect).toBeTruthy()
});
