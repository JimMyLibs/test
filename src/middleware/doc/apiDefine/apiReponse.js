/** 
 * @apiDefine CODE_0
 * @apiSuccess (ErrCode 0) {Number} ErrCode=0 错误码
 * @apiSuccess (ErrCode 0) {String} ErrMsg='' 错误信息
 * @apiSuccess (ErrCode 0) {String} Version='0.0.1' 版本
 * @apiSuccess (ErrCode 0) {Object} data='{}' 数据对象
 * @apiSuccess (ErrCode 0) {Object} data.key='value' 单个字段
 * 
 * @apiSuccessExample {json} ErrCode 0
 *   HTTP/1.1 200 OK
 * {
 *      ErrCode: 0,
 *      ErrMsg: '',
 *      Version: '0.0.1',
 *      data : {
 *          key : 'value'
 *      }
 * }
 * 
 */


/** 
 * @apiDefine CODE_200
 * @apiSuccess1 (Reponse 200) {number} code 状态码 200
 * @apiSuccess1 (Reponse 200) {json} [data='""'] 如果有数据返回
 * @apiSuccessExample {json} http 200
 *   HTTP/1.1 200 OK
 *   {
 *     "code": 200,
 *     "data": ""
 *   }
 */

 /**
 * @apiDefine CODE_500
 * @apiSuccess1 (Response 500) {number} code 状态码 500
 * @apiSuccess1 (Response 500) {string} [message] error description
 * @apiSuccessExample {json} http 500
 *   HTTP/1.1 500 Internal Server Error
 *   {
 *     "code": 500
 *     "message": "xxx"
 *   }
 */

