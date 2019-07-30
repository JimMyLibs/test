interface MatchesFilterParams {
    pool: string,
    date?: string,
    league?: string
}

declare namespace api {
    function getName(id: number | string): string
    class Matches {
        constructor() //构造函数
        static filter(params: MatchesFilterParams): object // 获取赛事列表
        static getFilterMenu(): object // 获取筛选菜单
        static getOriginalData(): object // 获取原始数据
        static datePools(): object // 获取订制数据
    }
}
export default api