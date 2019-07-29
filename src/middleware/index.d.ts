interface MatchesFilterParams {
    pool: string,
    date: string,
    league: string
}

declare namespace api {
    class Matches {
        filter(params: MatchesFilterParams): object // 获取赛事列表
        getFilterMenu(): object // 获取筛选菜单
        getOriginalData(): object // 获取原始数据
        datePools(): object // 获取订制数据
    }
}
export default api