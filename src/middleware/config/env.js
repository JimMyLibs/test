let jsGlobal = (typeof window !== 'undefined'
    ? window
    : (typeof process === 'object' &&
        typeof require === 'function' &&
        typeof global === 'object')
        ? global
        : this);

export const isRN = () => {
    let isRN = true;
    try {
        const { product } = jsGlobal.navigator;
        isRN = !!product && product === 'ReactNative';
    } catch (error) {
        console.warn('isRN获取失败');
    }
    return isRN;
}

export const isDev = () => {
    let isDev = true;
    try {
        isDev = process.env.NODE_ENV !== 'production';
    } catch (error) {
        console.warn('isDev获取失败');
    }
    return isDev;
}

export const getLanguage = async () => {
    let RNLanguage = 'Eng';
    try {
        RNLanguage = await jsGlobal.getLanguage();        
    } catch (error) {
        console.warn('fail to getLanguage',error)
    }
    // console.warn('RNLanguage',RNLanguage)
    return RNLanguage || 'Eng';
}

let switchLanguage = true;
const autoSwitchLanguage = () => {
    switchLanguage = !switchLanguage;
    const curLanguage = switchLanguage ? 'Chi' : 'Eng'
    return curLanguage;
}

const getRNGlobal = ()=>{
    // console.warn('window == global', window == global)
    // console.warn('process', jsGlobal.process)
    // console.warn('navigator', jsGlobal.navigator)
    // console.warn('__DEV__', jsGlobal.__DEV__)
    // console.warn('Headers', jsGlobal.Headers)
    // console.warn('URL', jsGlobal.URL)
    // console.warn('jsGlobal',Object.keys(jsGlobal))
    // Object.keys(jsGlobal).map(item=>{
    //     console.warn('jsGlobal-',item,jsGlobal[item])
    // })
}