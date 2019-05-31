/**
 * [fetch 请求封装]
 */

import FetchBase from './FetchBase'
import devApiInfo from '../config/devApiInfo'
import { ISDEV, mockUrl } from '../config/project'

import { fetchApiInfo } from 'comm/business/commApi'
import { user } from 'comm/business/user'
import { deepAssign, isEmpty, p } from 'comm/js/utils/utils'


// 特殊接口参数
const specialKeys = ['apiType', 'headers', 'body', 'apiInfo', 'method', 'timeout']

/**
 * [options 请求全局配置]
 * @example
 * {
 *  apiInfo: {},
 *  apiType: 'product',
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
                    reqUrl = this.getUrl(url, devApiInfo, apiType)
                }
            }
            return this[method](reqUrl, { headers, body })
        } else {
            return fetchApiInfo().then(res => {
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
        let { apiInfo = {}, ...currentOptions } = this.formatOptions(options)

        let mixApiInfo = deepAssign(publicApiInfo, apiInfo)
        let mixOptions = deepAssign(publicOptions, currentOptions)

        let {
            headers = {},
            apiType,
            body
        } = mixOptions

        return {
            apiType,
            apiInfo: {
                ...mixApiInfo
            },
            headers: isMixHeaders
                ? this.mixHeaders(headers)
                : headers,
            body,
        }
    }

    /**
     * [getUrl description]
     * @param  {string}  url       [接口地址]
     * @param  {string} mixApiInfo [混合后的接口信息]
     * @param  {string} apiType    [接口类型]
     * @return {string}            [完整接口地址]
     */
    getUrl(url, mixApiInfo, apiType) {
        let { apiInfo } = this
        if (url.search(/^https?/) > -1) {
            return url
        }
        apiType = apiType
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
        let { token } = user()
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
