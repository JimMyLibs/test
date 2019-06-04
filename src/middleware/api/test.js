import { $post, $get } from '../fetch/Http'


export const testMock = ()=>{
    $post("/test?t=" + new Date().getSeconds(), {
        mock:{
            name: 'cname'
        }
    });
}

/**
 * 
 * @api {post} /path apiName002
 * @apiName apiName002
 * @apiGroup group
 * 
 * @apiParam {String} paramName description
 * 
 * @apiParamExample {type} Request-Example:
 * {
 *     property : value
 * }
 * 
 * @apiSuccess (200) {type} name description
 * 
 * @apiSuccessExample {type} Success-Response:
 * {
 *     resCode : 0000
 *     message : success
 *     data : {
 *          property : value
 *     }
 * 
 */

export const betslip = ()=>{
    return new Promise((resolve,reject)=>{
        $get('application.state.betslip.json').then(res=>{
            console.log('betslip',res)
            resolve(res);
        })
    })
}