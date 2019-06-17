const Http = require('./Fetch')
const { checkResponse } = require('../utils/commApi')

const http = new Http()


const $fetch = (api, data = {}, method = 'post', options) => {
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
}
exports.$get = (api, data) => {
    return $fetch(api, data, 'get')
}
exports.$post = (api, data) => {
    return $fetch(api, data)
}
exports.$upload = (api, data, options) => {
    // options [其他请求配置，如apiType，headers，params等]
    return $fetch(api, data, 'upload', options)
}

