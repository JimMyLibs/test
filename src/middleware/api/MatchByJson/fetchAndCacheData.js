import { $post, $get } from '../../fetch/Http'
import Cache from '../../utils/cache'
import { useFetfchCache, useJson } from '../../config/project'
import { getLanguage } from '../../config/env'


export const fetchData = async (args) => {

    const url = `/json/20190913/${args.inPlay == 1 ? 'getJSON_inplay.json' : 'getJSON.json'}`;
    if(useJson){// use location data
        const language = await getLanguage();
        let lcJson = null;
        if(language=='Eng'){
            lcJson = require(`../../xml${url}`);
        }else{
            lcJson = require(`../../xml${url}`);
        }
        return {
            ErrCode: 0,
            ErrMsg: '',
            data: lcJson,
        };``
    }    

    const LSdata = Cache.get(url);
    const getData = async ()=>{
        const resData = await $get(`http://127.0.0.1:8803/${url}`);// 300ms
        if (JSON.stringify(resData) !== '{}') {
            Cache.set(url, resData);
        }
        return resData;
    }
    if(useFetfchCache){
        if (LSdata) {
            return LSdata;// 100ms
        } else {
            return getData();
        }
    }else{
        return getData();
    }
}