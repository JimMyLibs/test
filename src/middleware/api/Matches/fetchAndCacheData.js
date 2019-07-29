import { $post, $get } from '../../fetch/Http'
import Cache from '../../utils/cache'
import { useFetfchCache } from '../../config/project'
// 本地调试，临时导入json
import json_FB_GetInfo from '../../xml/index/FB_GetInfo_chi.json'
const localResult = {
    ErrCode: 0,
    ErrMsg: '',
    data: json_FB_GetInfo,
}

export const fetchData = async (url) => {

    // return localResult;// 临时调试，本地数据

    const LSdata = Cache.get(url);
    const getData = async ()=>{
        const resData = await $get('',{
            apiType: 'FB_ODDS_ALL_TEST'
        });// 300ms
        if (JSON.stringify(resData) !== '{}') {
            Cache.set(url, resData);
        }
        return resData;
    }
    if(useFetfchCache){
        if (!LSdata) {
            return LSdata;// 100ms
        } else {
            return getData();
        }
    }else{
        return getData();
    }
}