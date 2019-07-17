let jsGlobal = (typeof window !== 'undefined'
    ? window
    : (typeof process === 'object' &&
        typeof require === 'function' &&
        typeof global === 'object')
        ? global
        : this);

export const getAppName = ()=>{
    let appName = 'app'
    try {
        if(window){
            appName = 'web'
        }
    } catch (error) {
        console.warn('客户端类型获取失败');
    }
    return appName;
}

export const getEnv = ()=>{
    let isDev = true;
    try {
        if(window){
            isDev = process.env.NODE_ENV !== 'production';
        }else{
            isDev = jsGlobal.__DEV__;
        }
    } catch (error) {
        console.warn('环境获取失败');
    }
    return isDev;
}

// 获取语言
export const getLanguage = ()=> {
    return 'Chi';
    // return 'Eng';
}