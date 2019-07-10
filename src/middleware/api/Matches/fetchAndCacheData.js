import { $post, $get } from '../../fetch/Http'
// 本地调试，临时导入json
import json_FB_GetInfo_chi from '../../xml/index/FB_GetInfo_chi.json'


export const fetchData = async (name)=> {
    try {
        if (json_FB_GetInfo_chi) {
            return json_FB_GetInfo_chi;
        } else {
            const LSdata = window.localStorage ? localStorage.getItem(name) : false;
            if (LSdata) {
                return JSON.parse(LSdata);// 100ms
            } else {
                const resData = await $get(name);// 300ms
                window.localStorage && localStorage.setItem(name, JSON.stringify(resData));
                return resData;
            }
        }
    } catch (err) {
        throw err;
    }
}