/**
 * @api {get} /FB_GetInfo_chi_ByMe FB_GetInfo_chi_ByMe
 * @apiGroup xml
 * @apiVersion 0.0.1
 * @apiDescription description
 * 
 * @apiParam {String} [name=''] description
 * @apiParamExample {json} Request:
 * {
 *     name : value
 * }
 * 
 * @apiSuccess (Reponse 200) {Number} resCode 200
 * @apiSuccess (Reponse 200) {String} message='success'
 * @apiSuccess (Reponse 200) {Object} data='{}' 
 * @apiSuccess (Reponse 200) {String} [data.result='ok'] 可选，默认值OK
 * 
 * @apiSuccessExample {json} Response:
 * {
 *     resCode : 0000
 *     message : success
 *     data : {
 *          result : ok
 *     }
 * }
 *
 */