import Http from './Fetch'
import conf from '../config/project'
import { checkResponse } from '../utils/commApi'
import { p } from '../utils/utils'

const http = new Http()

// 特殊接口参数
const specialKeys = ['apiType', 'headers', 'body', 'apiInfo', 'method', 'isConsole', 'isTip', 'isLoading', 'loginUrl']


export default {
    $loading(type) {
        console.log('$loading', type);
    },
    $tip(msg) {
        console.log('$tip', msg);
    },
    $fetch(api, data = {}, method = 'post', options) {
        return new Promise((resolve, reject) => {
            if (typeof data === 'object' && Object.keys(data).some(item => specialKeys.includes(item))) {
                conf = { ...conf, ...data }
            }
            let { isConsole = true, isTip = true, isLoading = true } = conf

            // 显示loading
            if (isLoading) {
                this.$loading(true)
            }

            http[`$${method}`](api, data, options).then(res => {
                if (isLoading) {
                    this.$loading(false)
                }

                // 打印日志
                if (isConsole) {
                    p('<================== fetch ===================>')
                    p(`${api} 请求及响应数据为：`)
                    p(data)
                    p(res)
                }

                // 判断fetch结果是否正确
                let { isCorrect, msg } = checkResponse(res, conf)
                if (isCorrect) {
                    resolve(res)
                } else {
                    if (isTip) {
                        this.$tip(msg)
                        reject(res)
                    } else {
                        resolve(res)
                    }
                }
            }).catch(err => {
                // 异常处理
                if (isLoading) {
                    this.$loading(false)
                }
                this.$tip(
                    typeof err === 'string'
                        ? err
                        : '网络异常，请稍后再试！')
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
