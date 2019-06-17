/**
 * fetch请求基础封装，可基于该类扩展所需fetch请求类
 */

// 引入json数据转换queryString方法
const { jsonToParams } = require('../utils/url')
// XML转JSON
const fxp = require('fast-xml-parser')

const fxpOpt = {
    attributeNamePrefix: '',// 将给定字符串添加到属性名称以进行标识
    // attrNodeName: false,// (有效名称）将所有属性分组为给定名称的属性。
    ignoreAttributes: false,// 忽略要解析的属性。
    // ignoreNameSpace: false,// 从标记和属性名称中删除命名空间字符串
    // allowBooleanAttributes: false,// 标记可以包含没有任何值的属性
    // parseNodeValue: false,// 将文本节点的值解析为float，integer或boolean。
    // parseAttributeValue: false,// 将属性的值解析为float，integer或boolean。
    // trimValues: true,// 修剪属性或节点的字符串值
    // cdataTagName: false,// 如果指定，解析器将CDATA解析为嵌套标记，而不是将其值添加到父标记。
    // cdataPositionChar: '\\c',// 它有助于将JSON转换回XML而不会丢失CDATA位置。
    // localeRange: true,// Parser将接受标记或属性名称中的非英语字符。查看＃87了解更多详情。例如localeRange: "a-zA-Zа-яёА-ЯЁ"
    // parseTrueNumberOnly: true,// 如果为true，则“+123”或“0123”之类的值将不会被解析为数字。
    // tagValueProcessor: false,// 转换期间的过程标记值。像HTML解码，单词大写等。仅适用于字符串。
    // attrValueProcessor: false,// 转换期间的流程属性值。像HTML解码，单词大写等。仅适用于字符串。
}


/**
 * Http fetch请求基类型
 */
module.exports = class Http {

    // 初始化
    constructor(options = {}) {
        this.conf = { ...options }
    }

    /**
     * toGet get类型请求处理
     * @param {string} url 请求地址
     * @param {undefined | object | string} 请求配置项，详情：
     * options 特别说明
     * 方法中涉及主要参数options, 为fetch请求配置信息或者请求参数，具体有以下几种情况：
     * 1. options为非必须参数，若无请求参数可不传
     *
     * 2. json类型参数
     * {key1: value1, key2: value2}
     *
     * 3. string类型参数
     * key1=value1&key2=value2
     *
     * 4. 自定义headers，此时实际参数需放在body中（若无则无须body字段，body项也可为字符串值）
     * {headers: {token: '#####'}, body: {key1: value1, key2: value2}}
     *
     * 5. 自定义method， 此时实际参数需放在body中（ 若无则无须body字段，body项也可为字符串值）
     * {method: 'delete', body: {key1: value1, key2: value2}}
     *
     * 6. 也可同时设置method与headers，body值同1、2、3中不传，json及字符串形式均可
     */
    toGet(url, options) {
        let { url: reqUrl, conf: reqConf } = this.getGetConf(url, options)
        return this.toFetch(reqUrl, reqConf)
    }

    /**
     * toPost post类型请求处理
     * @param {string} url 请求地址
     * @param {undefined | object | string} 请求配置项，详情请查看上述toGet中 "options 特别说明"
     */
    toPost(url, options) {
        let reqConf = this.getPostConf(options)
        return this.toFetch(url, reqConf)
    }

    /**
     * toUpload 文件（ FormData）上传类型请求处理
     * @param {string} url 请求地址
     * @param {undefined | object | string} 请求配置项或者参数
     * @example
     * {apiKeyName: file} apiKeyName为接口定义接受文件字段名，file为文件对象
     * 文件对象举例： document.getElementById('file').files[0]（ 批量则取files即可）
     * 若需设置headers或者method， options项可按上述toGet中 "options 特别说明"，切记此时实际数据需放在body中
     * @param {boolean} isSetContentType = true 若未设置headers中Content-type，是否自动添加（默认true）
     */
    toUpload(url, options, isSetContentType = true) {
        let { method = 'post', body, headers = {} } = this.getReqConf(options)

        let fetConf = { method: method.toUpperCase() }

        let contentIndex = Object.keys(headers).findIndex(item => item.toLocaleLowerCase() === 'content-type')
        if (contentIndex === -1 && isSetContentType) {
            headers['Content-type'] = 'application/x-www-form-urlencoded; charset=UTF-8'
            fetConf.headers = headers
        }

        let formBody = new FormData()
        if (typeof body === 'object' && body !== null) {
            if (body instanceof FormData) {
                formBody = body
            } else {
                for (let key in body) {
                    formBody.append(key, body[key])
                }
            }
            fetConf.body = formBody
        }

        return this.toFetch(url, fetConf)
    }

    /**
     * getGetConf 获取get类型fetch配置信息
     * @param {string} url 请求地址
     * @param {undefined | object | string} options 详情见上述toGet中 "options 特别说明"
     */
    getGetConf(url, options) {
        if (typeof url !== 'string' || url.trim() === '') {
            throw new Error('fetch url is required and must be a string')
        }
        let { method, body, headers } = this.getReqConf(options)
        method = method ? method : 'get'
        let conf = {
            method: method.toUpperCase()
        }

        if (typeof body === 'string' && !(body.includes('t='))) {
            body = body.trim() === '' ? `t=${Date.now()}` : `${body}&t=${Date.now()}`
        }

        if (typeof body === 'object' && body !== null) {
            body = 't' in body ? body : {
                ...body,
                t: Date.now()
            }
            body = jsonToParams(body)
        }

        url = url.includes('?') ? `${url}&${body}` : `${url}?${body}`

        if (typeof headers === 'object') {
            conf.headers = headers
        }

        return {
            url,
            conf
        }
    }

    /**
     * getGetConf 获取post类型fetch配置信息
     * @param {undefined | object | string} options 详情见上述toGet中 "options 特别说明"
     */
    getPostConf(options) {
        let { method, body, headers } = this.getReqConf(options)
        method = method ? method : 'post'
        let conf = this.getContentFormat(headers, body)
        return {
            method: method.toUpperCase(),
            ...conf
        }
    }

    /**
     * getContentFormat
     * @param {object} headers 根据headers中格式要求，设置对应参数（body）为对应类型数据
     * @param {undefined | string | object} body
     */
    getContentFormat(headers, body) {
        let formatBody = {}
        if (typeof headers === 'object') {
            let contentItem = Object.keys(headers).find(item => item.toLocaleLowerCase() === 'content-type')
            if (contentItem && typeof headers[contentItem] === 'string') {
                let contentValue = headers[contentItem]

                // application/json; charset=UTF-8
                if (contentValue.includes('application/json')) {
                    body = typeof body === 'object' ? JSON.stringify(body) : body
                }

                // application/x-www-form-urlencoded; charset=UTF-8
                if (contentValue.includes('application/x-www-form-urlencoded')) {
                    body = typeof body === 'object' ? jsonToParams(body) : body
                }

            }
            formatBody.headers = headers
        }

        if (typeof body !== 'undefined' && body !== '') {
            formatBody.body = body
        }

        return formatBody
    }

    /**
     * getReqConf 根据用户传入的options项，来判断并返回实际请求配置，判断标准：
     * 1. 若options中包含 headers 或 body 项，则判断options中的body项值为实际请求参数
     * 2. 若options中无 headers 或 body 项， 则判断options为实际请求参数
     * @param {undefined | object | string} options 详情见上述toGet中 "options 特别说明"
     */
    getReqConf(options) {
        let reqConf = { body: '' }

        if (typeof options === 'undefined' || typeof options === 'string') {
            reqConf = { body: options || '' }
        }

        if (typeof options === 'object') {
            let { headers, body = '' } = options
            if (typeof headers === 'undefined') {
                reqConf = { body: { ...options } }
            } else {
                reqConf = { headers, body }
            }
        }

        return reqConf
    }

    /**
     * toFetch fetch请求统一入口
     * @param {string} url 请求地址
     * @param {undefined | object} reqConf fetch请求配置，如：
     * @example
     * {method: 'POST', body: 'key1=value1&key2=value2'}
     * reqConf可不传， 或为包含headers的对象，body数据格式会根据headers中'Content-type'来转换
     */
    toFetch(url, reqConf) {
        if (typeof url !== 'string' || url.trim() === '') {
            throw new Error('fetch url is required and must be a string')
        }
        let controller = null
        if (typeof AbortController !== 'undefined') {
            controller = new AbortController()
            const signal = controller.signal
            reqConf.signal = signal
        }
        let { conf } = this
        let { timeout = 10000 } = conf
        return Promise.race([
            fetch(url, reqConf).then(async data => {
                // in some SAMSUNG mobile data.ok is undefined so add data.status
                if (data.ok || data.status === 200) {
                    const result = await data.text()
                    if (fxp.validate(result)) {// XML
                        return fxp.parse(result, fxpOpt);
                    } else {// JSON
                        return data.json();
                    }
                } else {
                    // 未正常返回数据，则抛出异常
                    throw new Error(`响应数据异常，错误码：${data.status}`)
                }
            }).then(data => {
                return data
            }),
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    // 终止超时请求
                    if (controller) {
                        controller.abort()
                    }
                    reject('请求超时')
                }, timeout)
            })
        ])
    }

}
