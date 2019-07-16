// 其他公共api

import FetchBase from './FetchBase'
import Cache from '../utils/cache'
import { ISDEV, serverOriginUrl, serverPathUrl } from '../config/project'
import apiUrls from '../config/apiUrls'
import { successCondition, loginInvalidCondition, msgKeys } from '../config/fetchConf'

const http = new FetchBase()

// 存储api数据的sessionStorage标识
const apiInfoSessionId = 'apiInfoSessionId'

// 获取token
export function getToken() {
    return 'token:123465789';
}
// 同步获取api地址信息
export function getApiInfo() {
    if (ISDEV) {// 开发环境调用apiUrls['dev']
        return apiUrls['dev']
    } else if (!serverOriginUrl) {// 生产环境apiUrl为空时调用apiUrls['pro']
        return apiUrls['pro']
    }
    return Cache.get(apiInfoSessionId)
}
// 保存api地址信息
export function setApiInfo(info) {
    Cache.set(apiInfoSessionId, info)
}
// 异步获取api地址信息
export function fetchApiInfo() {
    let curInfo = getApiInfo()
    return new Promise(async (resolve, reject) => {
        if (ISDEV) {
            resolve(apiUrls['dev'])
        } else {
            if (curInfo) {
                resolve(curInfo)
            } else {
                const ApiOriginPath = await getApiOriginPath();
                resolve(ApiOriginPath);
            }
        }
    })
}
const getApiOriginPath = async () => {
    const serverOrigin = await http.toGet(serverOriginUrl);
    const serverPath = serverPathUrl && await http.toGet(serverPathUrl);
    console.log('server', { serverOrigin, serverPath })
    setApiInfo(serverOrigin.TXN_XML)
    return serverOrigin.TXN_XML;
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