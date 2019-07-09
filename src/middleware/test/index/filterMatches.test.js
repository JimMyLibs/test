import Api from '../../api/index'


test('the data is filterMatches', async () => {
    const data = await Api.filterMatches('HDA');
    console.log('filterMatches________________',data)
    expect(data).toBe('2')
});