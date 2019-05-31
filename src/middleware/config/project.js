
const origin = location.origin

export default {
    isConsole: true,// 是否答应日志（如请求日志）
    isTip: true,// 网络请求出错时，是否提示错误
    isLoading: true,// 是否显示loading动画
    ISDEV: process.env.NODE_ENV !== 'production',
    apiUrl: `${origin}/api.v1.json`, 
    mockUrl: 'http://mock.91525.net:35001/',
}