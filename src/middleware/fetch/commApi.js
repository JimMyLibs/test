// 其他公共api

import FetchBase from './FetchBase'
import Cache from '../utils/cache'
import { ISDEV, serverOriginUrl, serverPathUrl } from '../config/project'
import { successCondition, loginInvalidCondition, msgKeys } from '../config/fetchConf'

const http = new FetchBase()

const curEnv = ISDEV ? 'dev' : 'pro';
// 存储api数据的sessionStorage标识
const apiInfoSessionId = 'apiInfoSessionId' + '_' + curEnv;

// 获取token
export function getToken() {
    return 'token:123465789';
}
// 同步获取api地址信息
export function getApiInfo(key) {
    return Cache.get(key)
}
// 保存api地址信息
export function setApiInfo(key,info) {
    Cache.set(key, info)
}
// 异步获取api地址信息
export function fetchApiInfo() {
    let curInfo = getApiInfo(apiInfoSessionId)
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
        try {
            if (curInfo) {// 读取缓存
                resolve(curInfo)
            } else {
                const ApiOriginPath = await getApiOriginPath();
                resolve(ApiOriginPath);
            }            
        } catch (error) {
            reject(error)
        }
    })
}
const getApiOriginPath = async () => {
    const serverOrigin = serverOriginUrl[curEnv] && await http.toGet(serverOriginUrl[curEnv]) || {};
    const serverPath = await http.toGet(serverPathUrl[curEnv]);
    // console.log('【pro-serverInfo】', { serverOrigin, serverPath })
    const mixInfo = { serverOrigin, serverPath: serverPath.data.TXN_XML };
    setApiInfo(apiInfoSessionId,mixInfo)
    return mixInfo;
}
/**
 * [checkResponse fetch请求结果是否正确判断处理]
 * @param  {object}  res          [请求结果]
 * @param  {Boolean} [isTip=true] [是否自动处理错误，如登陆失效后自动跳转到登陆页]
 * @return {object}               [判断结果对象]
 */
export function checkResponse(res) {
    let isCorrect = true
    let msg = '系统异常，请稍后重试！'
    if (typeof res === 'object') {
        let successKey = Object.keys(res).find(item => Object.keys(successCondition).includes(item))
        let msgKey = Object.keys(res).find(item => msgKeys.includes(item))

        if (successKey && res[successKey] != successCondition[successKey]) {// 错误码
            if (res[successKey] == loginInvalidCondition[successKey]) {
                console.log('登录失效');
            }
            isCorrect = false
        }

        if (msgKey && res[msgKey]) {
            msg = res[msgKey]
        }

    }
    return {
        isCorrect,
        msg
    }
}