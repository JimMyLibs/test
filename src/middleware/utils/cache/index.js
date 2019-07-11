
class Cache {
    constructor() {

    }
    get(key) {
        if(window){// web端
            if(window.localStorage){
                this.webGet(key);
            }
        }
    }
    set(key,info) {
        if(window){// web端
            if(window.localStorage){
                this.webSet(key, info);
            }
        }
    }
    webGet(key) {
        let currentInfo = JSON.parse(localStorage.getItem(key)) || {};
        return currentInfo
    }
    webSet(key, info) {
        let currentInfo = JSON.parse(localStorage.getItem(key)) || {};
        if (typeof info === 'undefined') {// 获取信息
            return currentInfo
        }
        // 存储/更新用户信息
        let mixInfo = JSON.stringify(Object.assign({}, currentInfo, info))
        localStorage.setItem(key, mixInfo)
    }
    rnGet() {

    }
    rnSet() {

    }
    androidGet() {

    }
    androidSet() {

    }
    iosGet() {

    }
    iosSet() {

    }
    wechatGet() {

    }
    wechatSet() {

    }
}

export default new Cache();