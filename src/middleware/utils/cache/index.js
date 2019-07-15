
class Cache {
    constructor() {

    }
    get(key) {
        if (window) {// web端
            if (window.localStorage) {
                return this.webGet('__'+key+'__');
            }
        }
    }
    set(key, info) {
        if (window) {// web端
            if (window.localStorage) {
                return this.webSet('__'+key+'__', info);
            }
        }
    }
    webGet(key) {
        let curInfo = JSON.parse(localStorage.getItem(key) || '{}');// LS值为空时，JSON.parse会报错，所以返回'{}'
        if (JSON.stringify(curInfo) === '{}' || curInfo === 'undefined' || curInfo === 'null'){// 特殊值返回''，方便业务层非空判断
            return '';
        }else{
            return curInfo;
        }
    }
    webSet(key, info) {
        let curInfo = JSON.parse(localStorage.getItem(key)) || {};
        if (info === undefined) {// 获取信息
            return curInfo;
        }
        // 存储/更新用户信息
        let mixInfo = JSON.stringify(Object.assign({}, curInfo, info))
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