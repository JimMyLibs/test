
/**
 * @api {get} index/FB_GetInfo.json filterMatches
 * @apiGroup Home
 * @apiVersion 0.0.2
 * @apiDescription filterMatches
 * 
 * @apiParam {String} pool='HAD' Bet type
 * @apiParam {String} date='' date
 * @apiParam {String} league='' country
 * @apiParamExample {json} Instructions:
 * {
 *      import api from '../middleware/api'
 * 
 *      // Filter data: Get all the data by air
 *      const result = await api.Matches.filter({
 *          pool: 'HAD',
 *          date: '',
 *          league: '',
 *      });
 *      const { matchList } = result.data;
 *      // pool list
 *      const poolList = api.Matches.poolList;
 *      // Date list
 *      const dateList = api.Matches.dateList;
 *      // Country list
 *      const leagueList = api.Matches.leagueList;
 *      
 *      // Pool of existing data
 *      HAD/HDC/HFT/TQL/CRS/FCS/TTG/OOE/FHL/FGS/FTS/HIL/FHL/CHL
 * }
 * 
 * @apiSuccess (Reponse 200) {Object[]} data
 * @apiSuccess (Reponse 200) {String} data.date Event date (title)
 * @apiSuccess (Reponse 200) {Object[]} data.coupons Tour list
 * @apiSuccess (Reponse 200) {String} data.coupons.league country (div)
 * @apiSuccess (Reponse 200) {String} data.coupons.oddsNames odds type
 * @apiSuccess (Reponse 200) {Object[]} data.coupons.matches Match type
 * @apiSuccess (Reponse 200) {String} data.coupons.matches.home Home team (team1)
 * @apiSuccess (Reponse 200) {String} data.coupons.matches.away Away team (team2)
 * @apiSuccess (Reponse 200) {String} data.coupons.matches.score_Home Home team score (score1)
 * @apiSuccess (Reponse 200) {String} data.coupons.matches.score_Away Away team score (score2)
 * @apiSuccess (Reponse 200) {String} data.coupons.matches.matchDateTime End Time (timing)
 * @apiSuccess (Reponse 200) {String} data.coupons.matches.pool Bet type
 * @apiSuccess (Reponse 200) {String} data.coupons.matches.poolNum Total number of bets (pool)
 * @apiSuccess (Reponse 200) {String} data.coupons.matches.corner Corner kick (corner)
 * @apiSuccess (Reponse 200) {String} data.coupons.matches.inplay Inplay
 * @apiSuccess (Reponse 200) {Object[]} data.coupons.matches.oddsSet Odds list
 * @apiSuccess (Reponse 200) {String} data.coupons.matches.oddsSet.enabled
 * @apiSuccess (Reponse 200) {String} data.coupons.matches.oddsSet.oddsUpdateTime Odds update time
 * @apiSuccess (Reponse 200) {String} data.coupons.matches.oddsSet.stopSell Discontinued time
 * @apiSuccess (Reponse 200) {Object[]} data.coupons.matches.oddsSet.oddsInfo Odds list
 * @apiSuccess (Reponse 200) {String} data.coupons.matches.oddsSet.oddsInfo.name Odds identification
 * @apiSuccess (Reponse 200) {String} data.coupons.matches.oddsSet.oddsInfo.odds Odds value
 * 
 * @apiSuccessExample {json} Success-Response: 
 * HTTP/1.1 200 OK
 * {
 *     ErrCode: 0,
 *     ErrMsg: "",
 *     data: [
 *          {
 *              date: '08/10 (THU)',    // Event date (title)
 *              coupons: [              // Tour list
 *                  {
 *                      league: 'European Nations Cup',        // country (div)
 *                      league: ['H','D','A'],        // odds type
 *                      matches:[                   // Match list
 *                          {
 *                              home: 'China',               // Home team (team1)
 *                              away: 'Brazil',               // Away team (team2)
 *                              score_Home: '1',            // Home team score (score1)
 *                              score_Away: '2',            // Away team score (score2)
 *                              matchDateTime: '19:00,21/06',   // End Time (timing)
 *                              pool: 'HDA',                // Bet type (New)
 *                              poolNum: '3',               // Total number of bets (pool)
 *                              corner: '0',                // Corner kick (corner)
 *                              inplay: '0',
 *                              oddsSet : [            // Betting pool
 *                                  {
 *                                      enabled: '0',
 *                                      stopSell: '08/10 10:30', // Discontinued time
 *                                      oddsInfo: [              // Odds list
 *                                          {
 *                                              name: 'H',              // Odds identification
 *                                              odds: '1.2',            // Odds value
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