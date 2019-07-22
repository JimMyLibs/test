// 其他公共api

import FetchBase from './FetchBase'
import Cache from '../utils/cache'
import { ISDEV, serverOriginUrl, serverPathUrl } from '../config/project'
import apiUrls from '../config/apiUrls'
import { successCondition, loginInvalidCondition, msgKeys } from '../config/fetchConf'

const http = new FetchBase()

// 存储api数据的sessionStorage标识
const apiInfoDevSessionId = 'apiInfoDevSessionId'
const apiInfoProSessionId = 'apiInfoProSessionId'

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
    let curInfo = getApiInfo()
    return new Promise(async (resolve, reject) => {
        if (curInfo) {// 读取缓存
            resolve(curInfo)
        } else {
            if (ISDEV) {// 开发
                const ApiOriginPath = getDevApiOriginPath();
                resolve(ApiOriginPath);
            } else {// 生产
                const ApiOriginPath = await getProApiOriginPath();
                resolve(ApiOriginPath);
            }
        }
    })
}
const getDevApiOriginPath = () => {
    const serverOrigin = {};
    const serverPath = require('../xml/config/GetPara.json');
    // console.log('【dev-serverInfo】', { serverOrigin, serverPath })
    const mixInfo = { serverOrigin, serverPath: serverPath.TXN_XML };
    setApiInfo(apiInfoDevSessionId,mixInfo)
    return mixInfo;
}
const getProApiOriginPath = async () => {
    const serverOrigin = serverOriginUrl && await http.toGet(serverOriginUrl) || {};
    const serverPath = await http.toGet(serverPathUrl);
    // console.log('【pro-serverInfo】', { serverOrigin, serverPath })
    const mixInfo = { serverOrigin, serverPath: serverPath.TXN_XML };
    setApiInfo(apiInfoProSessionId,mixInfo)
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