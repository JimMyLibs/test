/**
 * [fetch 请求封装]
 */
import FetchBase from './FetchBase'
import apiUrls from '../config/apiUrls'
import { ISDEV, mockUrl, fetchType as publicFetchType } from '../config/project'

import { fetchApiInfo, getToken } from './commApi'
import { deepAssign, isEmpty } from '../utils/utils'


// 特殊接口参数
const specialKeys = ['apiType', 'fetchType', 'headers', 'body', 'apiInfo', 'method', 'timeout']

/**
 * [options 请求全局配置]: 主要用于upload请求
 * @example
 * {
 *  apiInfo: { },
 *  apiType: 'FB_ODDS_ALL',
 *  fetchType: 'Info',
 *  body: {},
 *  headers: {}
 * }
 * @type {Object}
 */
export default class Http extends FetchBase {
    constructor(options = {}) {
        super(options)
        let { apiInfo = {}, ...other } = options

        // 全局接口信息
        this.publicApiInfo = apiInfo

        let publicOptions = {}

        // 公共配置信息
        if (typeof other === 'object') {
            publicOptions = this.formatOptions(other)
        }

        this.publicOptions = publicOptions

    }

    /**
     *
     * @param {string} url  接口地址
     * @param {object} options  配置信息
     * @param  {Boolean} [isMixHeaders=true] [是否需要混合默认headers]
     */
    $get(url, options, isMixHeaders = true) {
        return this.$fetch(url, options, 'toGet', isMixHeaders)
    }

    $post(url, options, isMixHeaders = true) {
        return this.$fetch(url, options, 'toPost', isMixHeaders)
    }

    $upload(url, options, isMixHeaders = false) {
        return this.$fetch(url, options, 'toUpload', isMixHeaders)
    }

    /**
     * [$fetch 请求统一入口]
     * @param  {string}  url                 [接口地址]
     * @param  {object}  options             [请求配置]
     * @param  {string}  fnName              [请求函数名]
     * @param  {Boolean} [isMixHeaders=true] [是否需要混合默认headers]
     * @return {function}                    [请求promise]
     */
    $fetch(url, options, method, isMixHeaders = true) {
        let { apiInfo, headers, body = {}, apiType, fetchType } = this.getFetchOptions(options, isMixHeaders)
        let reqUrl = ''
        if (ISDEV) {
            if (body.mock) {
                url = url.replace(/^\/+/, '')
                reqUrl = `${mockUrl}/${url}`
            } else { // not use mock
                if (isEmpty(apiInfo)) {
                    reqUrl = this.getUrl(url, apiUrls.dev, apiType, fetchType)
                }
            }
            return this[method](reqUrl, { headers, body })
        } else {
            return fetchApiInfo().then(res => {
                console.log('【fetchApiInfo】',res)
                reqUrl = this.getUrl(url, res, apiType, fetchType)
                console.log('【完整地址：reqUrl】',reqUrl)
                return this[method](reqUrl, { headers, body })
            })
        }
    }

    /**
     * [getFetchOptions 获得请求配置信息]
     * @param  {object}  options             [请求配置]
     * @param  {Boolean} [isMixHeaders=true] [是否需要混合默认headers]
     * @return {object}                      [请求配置信息]
     */
    getFetchOptions(options, isMixHeaders = true) {
        let { publicApiInfo, publicOptions } = this
        let { curApiInfo = {}, ...currentOptions } = this.formatOptions(options)
        let mixApiInfo = deepAssign(publicApiInfo, curApiInfo)
        let mixOptions = deepAssign(publicOptions, currentOptions)
        let { headers = {}, body, apiType, fetchType } = mixOptions

        return {
            apiType,
            fetchType,
            headers: isMixHeaders ? this.mixHeaders(headers) : headers,
            body,
            apiInfo: { ...mixApiInfo },
        }
    }

    /**
     * [getUrl description]
     * @param  {string} url       [接口地址]
     * @param  {string} mixApiInfo [混合后的接口信息]
     * @param  {string} apiType    [接口类型]
     * @param  {string} fetchType  [请求类型]
     * @return {string}            [完整接口地址]
     */
    getUrl(url, mixApiInfo, apiType, fetchType = publicFetchType) {
        let { apiInfo } = this
        if (url.search(/^https?/) > -1) {
            return url
        }
        // console.log('【apiType】',apiType,'【fetchType】',fetchType,'【publicFetchType】',publicFetchType) 
        url = url.replace(/^\/+/, '')
        mixApiInfo = mixApiInfo || apiInfo
        let typeUrl = mixApiInfo[fetchType]
        typeUrl = this.getJcUrl(apiType,typeUrl);
        console.log('【当前apiType地址】',typeUrl) 
        // console.log('【客户端请求地址】',url) 
        if (typeof typeUrl === 'undefined') {
            throw new Error('type is not in apiInfo')
        }
        typeUrl = `${typeUrl.replace(/\/+$/, '')}`
        return url ? `${typeUrl}/${url}` : typeUrl
    }
    // 转化为马会专用链接
    getJcUrl(apiType,typeUrl){       
        if (ISDEV) {
            return typeUrl;
        }else{
            const urlObj = {};
            typeUrl.Add.map(item=>{
                urlObj[item.Key] = item;
            })
            // console.log('【马会当前fetchType所有地址】',urlObj) 
            const result = urlObj[apiType][this.getLanguage()];
            return result;
        }
    }
    // 获取语言
    getLanguage() {
        return 'Chi';
        // return 'Eng';
    }

    // 格式化options
    formatOptions(options = {}) {
        if (typeof options === 'string') {
            return { body: options }
        }
        let isFindSpecial = Object.keys(options).some(key => specialKeys.includes(key))
        if (isFindSpecial) {
            return {
                ...options
            }
        }
        return {
            body: {
                ...options
            }
        }
    }


    // 未设置Content-type， 则设置默认Content-type
    // 默认为： 'Content-type': 'application/json; charset=UTF-8'
    mixHeaders(headers = {}) {
        let { token } = getToken()
        let isHadContentType = Object.keys(headers).some(item => item.toLocaleLowerCase() === 'content-type')
        if (!isHadContentType) {
            headers = {
                ...headers,
                'Content-type': 'application/json; charset=UTF-8'
            }
        }
        if (token) {
            headers = {
                token,
                ...headers
            }
        }
        return {
            ...headers
        }
    }

}
