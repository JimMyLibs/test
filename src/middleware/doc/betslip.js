/**
 * @api {get} /betslip.json betslip
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
 * @apiSuccess (Reponse 200) {number} resCode 200
 * @apiSuccess (Reponse 200) {json} message='success'
 * @apiSuccess (Reponse 200) {json} data='{}' 如果有数据返回
 * @apiSuccess (Reponse 200) {number} [data.betLegSelections='{}'] 如果有数据返回
 * @apiSuccess (Reponse 200) {number} [data.betLegSelections.ls_sel_5b1b5232='{}'] 彩种
 * @apiSuccess (Reponse 200) {number} [data.betLegSelections.ls_sel_5b1b5232.id] id
 * @apiSuccessExample {json} Response:
 * {
 *     resCode : 0000
 *     message : success
 *     data : {
 *          result : ok
 *     }
 * }
 */