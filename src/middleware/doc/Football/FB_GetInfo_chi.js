/**
 * @api {get} index/FB_GetInfo_chi.json FB_GetInfo_chi
 * @apiGroup index
 * @apiVersion 0.0.1
 * @apiDescription 首页列表
 * 
 * @apiParam {String} [type='HAD'] 投注类型
 * @apiParamExample {json} Request:
 * {
 *      import api from "../middleware/api/index";
 * 
 *      const result = await api.getMatches('HAD');
 * }
 * 
 * @apiSuccess (Reponse 200) {Object[]} data
 * @apiSuccess (Reponse 200) {String} data.date 比赛日期 (title)
 * @apiSuccess (Reponse 200) {Object[]} data.coupons 比赛列表
 * @apiSuccess (Reponse 200) {String} data.coupons.league 国家 (div)
 * @apiSuccess (Reponse 200) {Object[]} data.coupons.matches 投注类型
 * @apiSuccess (Reponse 200) {String} data.coupons.matches.home 主队 (team1)
 * @apiSuccess (Reponse 200) {String} data.coupons.matches.away 客队 (team2)
 * @apiSuccess (Reponse 200) {String} data.coupons.matches.score_Home 主队比分 (score1)
 * @apiSuccess (Reponse 200) {String} data.coupons.matches.score_Away 客队比分 (score2)
 * @apiSuccess (Reponse 200) {String} data.coupons.matches.closeTime 结束时间 (timing)
 * @apiSuccess (Reponse 200) {String} data.coupons.matches.pool 投注类型
 * @apiSuccess (Reponse 200) {String} data.coupons.matches.poolNum 投注类型总数 (pool)
 * @apiSuccess (Reponse 200) {String} data.coupons.matches.corner 角球 (corner)
 * @apiSuccess (Reponse 200) {String} data.coupons.matches.inplay Inplay
 * @apiSuccess (Reponse 200) {Object[]} data.coupons.matches.pools 投注池
 * @apiSuccess (Reponse 200) {String} data.coupons.matches.pools.enabled
 * @apiSuccess (Reponse 200) {String} data.coupons.matches.pools.stopSell 停售时间
 * @apiSuccess (Reponse 200) {Object[]} data.coupons.matches.pools.oddsSets 赔率列表
 * @apiSuccess (Reponse 200) {String} data.coupons.matches.pools.oddsSets.name 赔率标识
 * @apiSuccess (Reponse 200) {String} data.coupons.matches.pools.oddsSets.odds 赔率值
 * 
 * @apiSuccessExample {json} Success-Response: 
 * HTTP/1.1 200 OK
 * {
 *     data: [
 *          {
 *              date: '08/10 (THU)',    // 比赛日期 (title)
 *              coupons: [              // 比赛列表
 *                  {
 *                      league: '歐洲國家盃',        // 国家 (div)
 *                      matches:[
 *                          {
 *                              home: '中国',               // 主队 (team1)
 *                              away: '巴西',               // 客队 (team2)
 *                              score_Home: '1',            // 主队比分 (score1)
 *                              score_Away: '2',            // 客队比分 (score2)
 *                              closeTime: '19:00,21/06',   // 结束时间 (timing)
 *                              pool: 'HDA',                // 投注类型 (新增)
 *                              poolNum: '3',               // 投注类型总数 (pool)
 *                              corner: '0',                // 角球 (corner)
 *                              inplay: '0',
 *                              pools : [            // 投注池
 *                                  {
 *                                      enabled: '0',
 *                                      stopSell: '08/10 10:30', // 停售时间
 *                                      oddsSets: [              // 赔率列表
 *                                          {
 *                                              name: 'H',              // 赔率标识
 *                                              odds: '1.2',            // 赔率值
 *                                          }
 *                                      ]
 *                                  }
 *                              ],
 *                          }
 *                      ]
 *                  }
 *              ],
 *          }
 *     ]
 * }
 *
 */