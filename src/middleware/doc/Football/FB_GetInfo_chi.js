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
 * @apiSuccess (Reponse 200) {Object[]} data.Coupons 比赛列表
 * @apiSuccess (Reponse 200) {String} data.Coupons.League 国家 (div)
 * @apiSuccess (Reponse 200) {String} data.Coupons.pool 投注类型
 * @apiSuccess (Reponse 200) {Object[]} data.Coupons.Matches 投注类型
 * @apiSuccess (Reponse 200) {String} data.Coupons.Matches.Home 主队 (team1)
 * @apiSuccess (Reponse 200) {String} data.Coupons.Matches.Away 客队 (team2)
 * @apiSuccess (Reponse 200) {String} data.Coupons.Matches.score_Home 主队比分 (score1)
 * @apiSuccess (Reponse 200) {String} data.Coupons.Matches.score_Away 客队比分 (score2)
 * @apiSuccess (Reponse 200) {String} data.Coupons.Matches.CloseTime 结束时间 (timing)
 * @apiSuccess (Reponse 200) {String} data.Coupons.Matches.poolNum 投注类型总数 (pool)
 * @apiSuccess (Reponse 200) {String} data.Coupons.Matches.corner 角球 (corner)
 * @apiSuccess (Reponse 200) {String} data.Coupons.Matches.Inplay Inplay
 * @apiSuccess (Reponse 200) {Object[]} data.Coupons.Matches.Pools 投注池
 * @apiSuccess (Reponse 200) {Object[]} data.Coupons.Matches.Pools.Enabled
 * @apiSuccess (Reponse 200) {Object[]} data.Coupons.Matches.Pools.StopSell 停售时间
 * @apiSuccess (Reponse 200) {Object[]} data.Coupons.Matches.Pools.OddsSets 赔率列表
 * @apiSuccess (Reponse 200) {String} data.Coupons.Matches.Pools.OddsSets.name 赔率标识
 * @apiSuccess (Reponse 200) {String} data.Coupons.Matches.Pools.OddsSets.Odds 赔率值
 * 
 * @apiSuccessExample {json} Response:
 * {
 *     data: [
 *          {
 *              date: '08/10 (THU)',// 比赛日期 (title)
 *              Coupons: [// 比赛列表
 *                  {
 *                      League: '歐洲國家盃',// 国家 (div)
 *                      pool: 'HDA',// 投注类型 (新增)
 *                      Matches:[
 *                          {
 *                              Home: '中国',// 主队 (team1)
 *                              Away: '巴西',// 客队 (team2)
 *                              score_Home: '1',// 主队比分 (score1)
 *                              score_Away: '2',// 客队比分 (score2)
 *                              CloseTime: '19:00,21/06',// 结束时间 (timing)
 *                              poolNum: '3',// 投注类型总数 (pool)
 *                              corner: '0',// 角球 (corner)
 *                              Inplay: '0',
 *                              Pools : [// 投注池
 *                                  {
 *                                      Enabled: '0',
 *                                      StopSell: '08/10 10:30',// 停售时间
 *                                      OddsSets: [// 赔率列表
 *                                          {
 *                                              name: 'H',// 赔率标识
 *                                              Odds: '1.2',// 赔率值
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