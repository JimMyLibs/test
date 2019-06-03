import Http from './Fetch'
import { checkResponse } from '../utils/commApi'

const http = new Http()

export default {
    $fetch(api, data = {}, method = 'post', options) {
        return new Promise((resolve, reject) => {
            http[`$${method}`](api, data, options).then(res => {
                // 判断fetch结果是否正确
                let { isCorrect } = checkResponse(res)
                if (isCorrect) {
                    resolve(res)
                } else {
                    reject(res)
                }
            }).catch(err => {
                // 异常处理
                console.log(typeof err === 'string' ? err : '网络异常，请稍后再试！')
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
