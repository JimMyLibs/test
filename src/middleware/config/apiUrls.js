
export default {
    dev:{
        // 版本类型接口前缀
        app: 'http://mock.91525.net:35001/dev_app',
    
        // 神盾类型接口前缀
        web: 'http://mock.91525.net:35001/dev_web',
    
        // 当期所在环境，该项为前端定义，dev开发环境，test测试环境，prod生产环境
        env: 'development'
    },
    pro:{
        // 版本类型接口前缀
        app: 'http://mock.91525.net:35001/pro_app',
    
        // 神盾类型接口前缀
        web: 'http://mock.91525.net:35001/pro_web',
    
        // 当期所在环境，该项为前端定义，dev开发环境，test测试环境，prod生产环境
        env: 'production'
    }
}
