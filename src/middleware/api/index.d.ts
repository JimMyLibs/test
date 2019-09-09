interface MatchesFilterParams {
    pool: string,
    date?: string,
    league?: string,
    inPlay?: number
}
interface MatchByJsonFilterParams {
    pool?: string,
    date?: string,
    league?: string,
    inPlay?: number
}

declare namespace api {
    function getName(id: number | string): string
    class Http {
        constructor() //构造函数
        static $get(url:string,params?:any): Promise<any> // $get
        static $post(url:string,params?:any): Promise<any> // $post
        static $upload(url:string,params?:any): Promise<any> // $upload
    }
    class Matches {
        constructor() //构造函数
        static getAllPoolsData(params?: MatchByJsonFilterParams): Promise<any> // 获取赛事列表
        static filter(params: MatchesFilterParams): Promise<any> // 获取赛事列表
        static getFilterMenu(): Promise<any> // 获取筛选菜单
        static getOriginalData(): Promise<any> // 获取原始数据
        static datePools(): Promise<any> // 获取订制数据
    }
    class MatchByXml {
        constructor() //构造函数
        static filter(params: MatchesFilterParams): Promise<any> // 获取赛事列表
        static getFilterMenu(): Promise<any> // 获取筛选菜单
        static getOriginalData(): Promise<any> // 获取原始数据
        static datePools(): Promise<any> // 获取订制数据
    }
    class MatchByJson {
        constructor() //构造函数
        static getAllPoolsData(params?: MatchByJsonFilterParams): Promise<any> // 获取赛事列表
        static filter(params: MatchesFilterParams): Promise<any> // 获取赛事列表
        static getFilterMenu(): Promise<any> // 获取筛选菜单
        static getOriginalData(): Promise<any> // 获取原始数据
        static dateLeague(reverse: number): Promise<any> // 获取订制数据
    }
    namespace User {
        function check(): any;
        function statement(): any;
        function sell(): any;
        function login(): any;
        function oauth2(): any;
    }
    class Video {
        constructor() //构造函数
        static barrage: any // 弹幕
    }
}
export default api

