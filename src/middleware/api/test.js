/**
 * @api {post} /path title
 * @apiGroup group1
 * @apiVersion 0.0.1
 * @apiDescription description
 * 
 * @apiParam {String} [name=''] description
 * 
 * @apiParamExample {json} Request:
 * {
 *     name : value
 * }
 * 
 * @apiSuccessExample {json} Response:
 * {
 *     resCode : 0000
 *     message : success
 *     data : {
 *          result : ok
 *     }
 * }
 */

import { $post, $get } from '../fetch/Http'

export default {
     testMock(){
        return $post("/test?t=" + new Date().getSeconds(), {
            mock:{
                name: 'cname'
            }
        });
    },    
     betslip(){// 下注
        return $get('betslip.json');
    },
     currentUser(){// 当前用户
        return $get('currentUser.json');
    },
     sportsbook(){// 赛事预定
        return $get('sportsbook.json');
    },
     versions(){// 版本
        return $get('versions.json');
    }

}

