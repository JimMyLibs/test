import { $post, $get } from '../../fetch/Http'
import Cache from '../../utils/cache'
import { useFetfchCache, useJson } from '../../config/project'
import { getLanguage } from '../../config/env'


export const fetchData = async (args) => {

    const url = args.inPlay == 1 ? '/json/20190903/getJSON_inplay.json' : '/json/20190903/getJSON.tmp.json';
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
        };
    }    

    const LSdata = Cache.get(url);
    const getData = async ()=>{
        const resData = await $get(`${url}`);// 300ms
        // const resData = await $get('/json/20190819/getJSON.tmp.json');// 300ms
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