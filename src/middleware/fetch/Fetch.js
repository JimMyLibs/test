/**
 * 
 * @api {post} /path title
 * @apiName apiName
 * @apiGroup group
 * @apiVersion 0.0.1
 * 
 * 
 * @apiParam {String} paramName description
 * 
 * @apiParamExample {type} Request-Example:
 * {
 *     property : value
 * }
 * 
 * 
 * @apiSuccess (200) {type} name description
 * 
 * @apiSuccessExample {type} Success-Response:
 * {
 *     resCode : 0000
 *     message : success
 *     data : {
 *          property : value
 *     }
 * @apiSampleRequest http://mock.91525.net:35001/pro_app/
 * 
 * 
 */

/**
 * [fetch 请求封装]
 */
import FetchBase from './FetchBase'
import apiUrls from '../config/apiUrls'
import { ISDEV, mockUrl, apiType as projectType } from '../config/project'

import { fetchApiInfo, getToken } from '../utils/commApi'
import { deepAssign, isEmpty } from '../utils/utils'


// 特殊接口参数
const specialKeys = ['apiType', 'headers', 'body', 'apiInfo', 'method', 'timeout']

/**
 * [options 请求全局配置]: 主要用于upload请求
 * @example
 * {
 *  apiInfo: {},
 *  apiType: 'app',
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
        let { apiInfo, headers, body, apiType } = this.getFetchOptions(options, isMixHeaders)
        let reqUrl = ''
        if (ISDEV) {
            if (body.mock) {
                url = url.replace(/^\/+/, '')
                reqUrl = `${mockUrl}/${url}`
            } else { // not use mock
                if (isEmpty(apiInfo)) {
                    reqUrl = this.getUrl(url, apiUrls.dev, apiType)
                }
            }
            return this[method](reqUrl, { headers, body })
        } else {
            return fetchApiInfo().then(res => {
                console.log(100,url, res, apiType)
                reqUrl = this.getUrl(url, res, apiType)
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
        let { headers = {}, apiType, body } = mixOptions

        return {
            apiType,
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
     * @return {string}            [完整接口地址]
     */
    getUrl(url, mixApiInfo, apiType) {
        let { apiInfo } = this
        if (url.search(/^https?/) > -1) {
            return url
        }
        apiType = apiType || projectType
        url = url.replace(/^\/+/, '')
        mixApiInfo = mixApiInfo || apiInfo
        let typeUrl = mixApiInfo[apiType]
        if (typeof typeUrl === 'undefined') {
            throw new Error('type is not in apiInfo')
        }
        typeUrl = `${typeUrl.replace(/\/+$/, '')}`
        return url ? `${typeUrl}/${url}` : typeUrl
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
