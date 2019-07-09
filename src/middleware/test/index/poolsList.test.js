import poolsList from '../../api/index/poolsList'


test('the data is poolsList', () => {
    const data = poolsList;
    console.log('poolsList________________',data)
    expect(data).toBe('2')
});
