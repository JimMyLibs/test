import { $post } from '../../fetch/Http'

class Barrage {
    constructor(){

    }
    async get(params) {
        const { videoId, videoTime } = params;
        try {
            const reult = await $post('/barrage/get',{
                videoId,videoTime,
                mock:{
                    list:[{value:'cnStr[100]'}],
                    pageSize: Math.ceil(Math.random()*20),
                }
            })
            return {
                ErrCode: 0,
                ErrMsg: '',
                data: {
                    list: reult.data.data.list,
                },
            };
            
        } catch (error) {
            console.error(error)
            return {
                ErrCode: 0,
                ErrMsg: '',
                data: {
                    list: [{value:'弹幕'},{value:'弹幕'},{value:'弹幕'},{value:'弹幕'},{value:'弹幕'},{value:'弹幕'},{value:'弹幕'},{value:'弹幕'},{value:'弹幕'},{value:'弹幕'},{value:'弹幕'},]
                },
            }            
        }
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