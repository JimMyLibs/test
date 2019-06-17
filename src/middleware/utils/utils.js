

import { ISDEV } from '../config/project'


// 生成不重复签名
export function createRandomId() {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }
  return S4() + S4() + S4() + S4()
}

export function getUUID() {
  let d = Date.now()
  let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    let r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (
      c == 'x'
        ? r
        : (r & 0x3 | 0x8)).toString(16)
  })
  return uuid
}

// 非生产环境下console才生效
export function p(...info) {
  if (ISDEV && window.console) {
    console.log(...info)
  }
}

// 判断变量，字符串，数组，对象是否为空
export function isEmpty(obj) {
  if (typeof obj === 'undefined') {
    return true
  }

  if (typeof obj === 'string' && obj.trim() === '') {
    return true
  }

  if (typeof obj === 'object') {
    if (obj === null) {
      return true
    }

    if (Array.isArray(obj) && obj.length === 0) {
      return true
    }

    let keyArr = Object.keys(obj)
    if (keyArr && keyArr.length === 0) {
      return true
    }
  }
  return false
}

/**
 * deepCopy 深拷贝对象或数组
 * @param {object|array} 对象或数组
 */
export function deepCopy(obj) {
  if (Array.isArray(obj)) {
    return obj.reduce((pre, next) => {
      pre.push(deepCopy(next))
      return pre
    }, [])
  } else if (typeof obj === 'object') {
    return Object.keys(obj).reduce((pre, next) => {
      if (obj.hasOwnProperty(next)) { // 过滤继承属性
        pre[next] = deepCopy(obj[next])
      }
      return pre
    }, {})
  } else {
    return obj
  }
}

/**
 * deepAssign 合并多个对象
 * @param  {...object} 一个或多个对象
 */
export function deepAssign(...objs) {
  return objs.reduce((pre, next) => {
    Object.keys(next).forEach(key => {
      let nextValue = next[key]
      if (pre.hasOwnProperty(key)) {
        let preValue = pre[key]
        if (typeof preValue === typeof nextValue) {
          if (Array.isArray(nextValue)) { // array replace
            pre[key] = deepCopy(nextValue)
          } else if (typeof nextValue === 'object') {
            pre[key] = deepAssign(preValue, nextValue)
          } else {
            pre[key] = nextValue
          }
        } else {
          pre[key] = deepCopy(nextValue)
        }
      } else {
        pre[key] = deepCopy(nextValue)
      }
    })
    return pre
  }, {})
}

// 动态创建script标签，creatScript().then(do something)
export function creatScript(url) {
  return new Promise((resolve, reject) => {
    let head = document.getElementsByTagName('head')[0]
    let script = document.createElement('script')
    script.onload = function() {
      resolve()
    }
    script.src = url
    head.appendChild(script)
  }).catch(err => {
    p(`创建${url}失败,error:${err}`)
  })
}
