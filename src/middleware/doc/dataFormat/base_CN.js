
/**
 * @api {post} /dataBase 数据格式
 * @apiGroup groupName_dataBase
 * @apiVersion 0.0.1
 * @apiDescription 数据格式
 * 
 * <a href="http://www.baidu.com/">测试</a>
 * 
 * 
 * @apiHeader {String} access-key Users unique access-key.
 * @apiHeaderExample {json} Header-Example:
 * {
 *      "Accept-Encoding": "Accept-Encoding: gzip, deflate"
 * }
 * 
 * @apiParam {Object} [params={}] 参数对象
 * @apiParam {Any} [params.key=value] 单个参数
 * @apiParamExample {json} Request:
 * {
 *      name : value
 * {
 * 
 * @apiUse CODE_0
 * @apiUse CODE_200
 * @apiUse CODE_500
 * 
 * @apiError UserNotFound The <code>id</code> of the User was not found.
 * @apiErrorExample {json} Error-Response:
 * HTTP/1.1 404 Not Found
 * {
 *     "error": "UserNotFound"
 * }
 *
 */