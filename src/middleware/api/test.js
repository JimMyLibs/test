import { $post, $get } from '../fetch/Http'


export const testMock = ()=>{
    return $post("/test?t=" + new Date().getSeconds(), {
        mock:{
            name: 'cname'
        }
    });
}
/** js
 * @apiDefine CODE_200
 * @apiSuccess (Reponse 200) {number} code 200
 * @apiSuccess (Reponse 200) {json} [data='""'] 如果有数据返回
 * @apiSuccessExample {json} Response 200 Example
 *   HTTP/1.1 200 OK
 *   {
 *     "code": 200,
 *     "data": ""
 *   }
 */
/**
 * @apiDefine CODE_500
 * @apiSuccess (Response 500) {number} code 500
 * @apiSuccess (Response 500) {string} [message] error description
 * @apiSuccessExample {json} Response 500 Example
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "code": 500
 *     "message": "xxx"
 *   }
 */

 /**
 * @apiDefine Data
 *
 * @apiParam (data) {string} [firstname]  Optional Firstname of the User.
 * @apiParam (data) {string} lastname     Mandatory Lastname.
 * @apiParam (data) {string} country="cn" Mandatory with default value "DE".
 * @apiParam (data) {number} [age=18]     Optional Age with default 18.
 */

/**
 * @api {POST GET} /api/test/hello[/:id]
 * @apiName test api
 * @apiGroup Hello World
 * @apiVersion 1.0.0
 * @apiDescription just a test
 * @apiPermission anyone
 * @apiSampleRequest http://test.github.com
 *
 * @apiParam {number} [id] any id
 * @apiParam {json} data object
 * @apiUse Data
 *
 * @apiParamExample {json} Request Example
 *   POST /api/test/hello/1
 *   {
 *     "data": {
 *       "firstname": "test",
 *       "lastname": "sails",
 *       "country": "cn"
 *     }
 *   }
 *
 * @apiUse CODE_200
 * @apiUse CODE_500
 */

export const betslip = ()=>{
    return $get('application.state.betslip.json');
}
export const currentUser = ()=>{
    return $get('application.state.currentUser.json');
}
export const sportsbook = ()=>{
    return $get('application.state.sportsbook.json');
}
export const versions = ()=>{
    return $get('application.state.versions.json');
}

/**
 * @api {post} /path title
 * @apiGroup group
 * @apiVersion 0.0.1
 * @apiDescription description
 * @apiHeader {String} [Content-Type=application/json;charset=UTF-8] ContentType
 * 
 * @apiParam (group) {String} [name=''] description
 * @apiParam (mock) {Object} mock={} description
 * 
 * @apiParamExample {json} Request:
 * {
 *     name : value
 * }
 * @apiParamExample {json} mockReq:
 * {
 *     mock : {
 *             name : value
 *         
 *     }
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