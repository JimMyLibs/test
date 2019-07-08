
export default {
    dev:{
        // 版本类型接口前缀
        // app: 'http://json.jc.com:8803/',
        app: 'http://169.254.222.170:8803/',
    
        // vm类型接口前缀
        vm: 'http://10.194.104.2:11698/',
    
        // 当期所在环境，该项为前端定义，dev开发环境，test测试环境，prod生产环境
        env: 'development'
    },
    pro:{
        // 版本类型接口前缀
        app: 'http://mock.91525.net:35001/pro_app',
    
        // vm类型接口前缀
        vm: 'http://mock.91525.net:35001/pro_vm',
    
        // 当期所在环境，该项为前端定义，dev开发环境，test测试环境，prod生产环境
        env: 'production'
    }
}
