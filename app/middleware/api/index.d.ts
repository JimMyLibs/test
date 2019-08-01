interface MatchesFilterParams {
    pool: string,
    date?: string,
    league?: string
}

declare namespace api {
    function getName(id: number | string): string
    class Matches {
        constructor() //构造函数
        static filter(params: MatchesFilterParams): Promise<any> // 获取赛事列表
        static getFilterMenu(): Promise<any> // 获取筛选菜单
        static getOriginalData(): Promise<any> // 获取原始数据
        static datePools(): Promise<any> // 获取订制数据
    }
}
export default api