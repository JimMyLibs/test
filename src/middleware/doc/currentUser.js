/**
 * @api {get} /currentUser.json currentUser
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
 * @apiSuccess (Reponse 200) {String} data.result 结果
 * @apiSuccess (Reponse 200) {Object} data.CURRENT 余额
 * @apiSuccess (Reponse 200) {Object} data.CURRENT.amount 金额
 * @apiSuccess (Reponse 200) {Object} data.CURRENT.currency 货币
 * @apiSuccess (Reponse 200) {String} data.id ID
 * @apiSuccess (Reponse 200) {String} data.language 语言
 * @apiSuccess (Reponse 200) {Object} data.preferences 偏好
 * @apiSuccess (Reponse 200) {Object} data.sportsbook 运动手册
 * @apiSuccess (Reponse 200) {Object} data.sportsbook.favouriteEvents 收藏活动
 * @apiSuccess (Reponse 200) {Object} data.sportsbook.favouriteMarketTypes 收藏夹标记类型
 * @apiSuccess (Reponse 200) {String} data.state 状态
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