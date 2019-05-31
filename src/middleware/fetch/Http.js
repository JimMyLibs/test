import Http from './Fetch'
import { checkResponse } from '../utils/commApi'
import { p } from '../utils/utils'

const http = new Http()

// 特殊接口参数
const specialKeys = ['apiType', 'headers', 'body', 'apiInfo', 'method']


export default {
    $fetch(api, data = {}, method = 'post', options) {
        return new Promise((resolve, reject) => {
            if (typeof data === 'object' && Object.keys(data).some(item => specialKeys.includes(item))) {
                conf = { ...data }
            }

            http[`$${method}`](api, data, options).then(res => {
                // 判断fetch结果是否正确
                let { isCorrect, msg } = checkResponse(res)
                if (isCorrect) {
                    resolve(res)
                } else {
                    reject(res)
                }
            }).catch(err => {
                // 异常处理
                console(typeof err === 'string' ? err : '网络异常，请稍后再试！')
                reject(err)
            })
        })
    },
    $get(api, data) {
        return this.$fetch(api, data, 'get')
    },
    $post(api, data) {
        return this.$fetch(api, data)
    },
    $upload(api, data, options) {
        // options [其他请求配置，如apiType，headers，params等]
        return this.$fetch(api, data, 'upload', options)
    },
}
