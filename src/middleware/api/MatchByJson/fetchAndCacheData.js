import { $post, $get } from '../../fetch/Http'
import Cache from '../../utils/cache'
import { useFetfchCache, useJson } from '../../config/project'
import { getLanguage } from '../../config/env'


export const fetchData = async (args) => {

    if(useJson){// use location data
        let lcJson = args.inPlay == 1 ? require('../../xml/json/20190913/getJSON_inplay.json') : require('../../xml/json/20190913/getJSON.json');
        // const language = await getLanguage();
        // if(language=='Eng'){
        //     lcJson = require('../../xml/json/20190913/getJSON.json');
        // }else{
        //     lcJson = require('../../xml/json/20190913/getJSON.json');
        // }
        return {
            ErrCode: 0,
            ErrMsg: '',
            data: lcJson,
        };
    }    

    const url = `/json/20190913/${args.inPlay == 1 ? 'getJSON_inplay.json' : 'getJSON.json'}`;
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