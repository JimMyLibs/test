/**
 * @api {get} /versions.json versions
 * @apiGroup Football
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
 * 
 * @apiSuccess (Reponse 200) {Object} data.build 构建
 * @apiSuccess (Reponse 200) {String} data.build.environment 环境
 * @apiSuccess (Reponse 200) {String} data.build.name 名称
 * @apiSuccess (Reponse 200) {String} data.timestamp 时间
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