import { $post, $get } from '../../fetch/Http'
import Cache from '../../utils/cache'
import { fetchCache } from '../../config/project'
// 本地调试，临时导入json
import json_FB_GetInfo_chi from '../../xml/index/FB_GetInfo_chi.json'

export const fetchData = async (url) => {
    try {
        // return json_FB_GetInfo_chi;

        const LSdata = Cache.get(url);
        if (LSdata && fetchCache) {
            return LSdata;// 100ms
        } else {
            const resData = await $get('',{
                apiType: 'FB_ODDS_ALL'
            });// 300ms
            if (JSON.stringify(resData) !== '{}') {
                Cache.set(url, resData);
            }
            return resData;
        }
    } catch (err) {
        throw err;
    }
}