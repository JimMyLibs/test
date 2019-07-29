
/**
 * @api {get} index/FB_GetInfo.json 获取比赛列表
 * @apiGroup Home
 * @apiVersion 0.0.1
 * @apiDescription 获取比赛列表
 * 
 * @apiParam {String} pool='HAD' 投注类型
 * @apiParam {String} date='' 日期
 * @apiParam {String} league='' 国家
 * @apiParamExample {json} 使用方法:
 * {
 *      import api from '../middleware/api'
 * 
 *      // 筛选数据: 传空获取全部数据
 *      const result = await api.Matches.filter({
 *          pool: 'HAD',
 *          date: '',
 *          league: '',
 *      });
 *      const { matchList } = result.data;
 *      // 玩法列表
 *      const poolList = api.Matches.poolList;
 *      // 日期列表
 *      const dateList = api.Matches.dateList;
 *      // 国家列表
 *      const leagueList = api.Matches.leagueList;
 *      
 *      // 目前已有数据的poll
 *      HAD/HDC/HFT/TQL/CRS/FCS/TTG/OOE/FHL/FGS/FTS/HIL/FHL/CHL
 * }
 * 
 * @apiSuccess (Reponse 200) {Object[]} data
 * @apiSuccess (Reponse 200) {String} data.date 赛事日期 (title)
 * @apiSuccess (Reponse 200) {Object[]} data.coupons 赛事列表
 * @apiSuccess (Reponse 200) {String} data.coupons.league 国家 (div)
 * @apiSuccess (Reponse 200) {String} data.coupons.oddsNames 赔率类型
 * @apiSuccess (Reponse 200) {Object[]} data.coupons.matches 比赛类型
 * @apiSuccess (Reponse 200) {String} data.coupons.matches.home 主队 (team1)
 * @apiSuccess (Reponse 200) {String} data.coupons.matches.away 客队 (team2)
 * @apiSuccess (Reponse 200) {String} data.coupons.matches.score_Home 主队比分 (score1)
 * @apiSuccess (Reponse 200) {String} data.coupons.matches.score_Away 客队比分 (score2)
 * @apiSuccess (Reponse 200) {String} data.coupons.matches.matchDateTime 结束时间 (timing)
 * @apiSuccess (Reponse 200) {String} data.coupons.matches.pool 投注类型
 * @apiSuccess (Reponse 200) {String} data.coupons.matches.poolNum 投注类型总数 (pool)
 * @apiSuccess (Reponse 200) {String} data.coupons.matches.corner 角球 (corner)
 * @apiSuccess (Reponse 200) {String} data.coupons.matches.inplay Inplay
 * @apiSuccess (Reponse 200) {Object[]} data.coupons.matches.oddsSet 赔率列表
 * @apiSuccess (Reponse 200) {String} data.coupons.matches.oddsSet.enabled
 * @apiSuccess (Reponse 200) {String} data.coupons.matches.oddsSet.oddsUpdateTime 赔率更新时间
 * @apiSuccess (Reponse 200) {String} data.coupons.matches.oddsSet.stopSell 停售时间
 * @apiSuccess (Reponse 200) {Object[]} data.coupons.matches.oddsSet.oddsInfo 赔率列表
 * @apiSuccess (Reponse 200) {String} data.coupons.matches.oddsSet.oddsInfo.name 赔率标识
 * @apiSuccess (Reponse 200) {String} data.coupons.matches.oddsSet.oddsInfo.odds 赔率值
 * 
 * @apiSuccessExample {json} Success-Response: 
 * HTTP/1.1 200 OK
 * {
 *     ErrCode: 0,
 *     ErrMsg: "",
 *     data: [
 *          {
 *              date: '08/10 (THU)',    // 赛事日期 (title)
 *              coupons: [              // 赛事列表
 *                  {
 *                      league: '歐洲國家盃',        // 国家 (div)
 *                      league: ['H','D','A'],        // 赔率类型
 *                      matches:[                   // 比赛列表
 *                          {
 *                              home: '中国',               // 主队 (team1)
 *                              away: '巴西',               // 客队 (team2)
 *                              score_Home: '1',            // 主队比分 (score1)
 *                              score_Away: '2',            // 客队比分 (score2)
 *                              matchDateTime: '19:00,21/06',   // 结束时间 (timing)
 *                              pool: 'HDA',                // 投注类型 (新增)
 *                              poolNum: '3',               // 投注类型总数 (pool)
 *                              corner: '0',                // 角球 (corner)
 *                              inplay: '0',
 *                              oddsSet : [            // 投注池
 *                                  {
 *                                      enabled: '0',
 *                                      stopSell: '08/10 10:30', // 停售时间
 *                                      oddsInfo: [              // 赔率列表
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