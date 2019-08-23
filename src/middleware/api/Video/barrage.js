import { $post } from '../../fetch/Http'

class Barrage {
    constructor(){

    }
    get(params) {
        const { videoId, videoTime } = params;
        // return {
        //     list:[{value:'弹幕'},{value:'弹幕'},{value:'弹幕'},{value:'弹幕'},{value:'弹幕'},{value:'弹幕'},{value:'弹幕'},{value:'弹幕'},{value:'弹幕'},{value:'弹幕'},{value:'弹幕'},]
        // }
        return $post('/barrage/get',{
            videoId,videoTime,
            mock:{
                list:[{value:'ctitle'}],
                pageSize: 20,
                totalNum: 100,
            }
        })
    }
    shoot(params) {
        const { videoId, videoTime, value } = params;
        return $post('/barrage/set',{
            videoId,videoTime,value,
            mock:{
                
            }
        })
    }
}
export default new Barrage();