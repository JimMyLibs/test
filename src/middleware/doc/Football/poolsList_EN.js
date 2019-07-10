
/**
 * @api {get} index/poolsList.json Filter menu
 * @apiGroup Home
 * @apiVersion 0.0.2
 * @apiDescription Filter menu
 * 
 * @apiParamExample {json} Instructions:
 * {
 *      import api from '../middleware/api'
 * 
 *      // Get the filter menu
 *      const poolsList = api.Pools.list;
 * }
 * 
 * @apiSuccess (Reponse 200) {String} HAD='Home/Away/Draw' Host and guest
 * @apiSuccess (Reponse 200) {String} FHAD='FHAD' Predict the first half of a game
 * @apiSuccess (Reponse 200) {String} HHAD='Handicap Had' Stronger team makes the ball to the weaker team
 * @apiSuccess (Reponse 200) {String} HDC='Handicap' Betting on the ball after the adjustment
 * @apiSuccess (Reponse 200) {String} HFT='HaFu' Predict the half of the game(45minute)And the audience(90minute)Host and guest results
 * @apiSuccess (Reponse 200) {String} TQL='To Qualify' At the designated event，Betting on which team can advance to the next event
 * @apiSuccess (Reponse 200) {String} CRS='Correct Score' Predict the official score of the game
 * @apiSuccess (Reponse 200) {String} FCS='FCS' Betting on the first half of the legal time of a game45Minutes and the first half of the score
 * @apiSuccess (Reponse 200) {String} TTG='Total Goals' Predict the number of goals scored by the two teams in the game
 * @apiSuccess (Reponse 200) {String} OOE='Odd/Even' Predict the number of goals scored by the two teams in the game is singular or double
 * @apiSuccess (Reponse 200) {String} HILO='HILO' The bettor may score more or less than the number specified by the pre-criminator for a match.(Medium sphere number)Bet
 * @apiSuccess (Reponse 200) {String} FHL='FHL' Betting on the number of goals in the first half of a game，More or less than the specified number of balls
 * @apiSuccess (Reponse 200) {String} CHLO='Corner HiLo' Betting on the specified game，The number of corner kicks jointly issued by the two teams*More or less than the specified number of corners
 * @apiSuccess (Reponse 200) {String} PS='Player specials' Does not include overtime or mutual shots12Results after the code
 * @apiSuccess (Reponse 200) {String} GPW='Group Winner' Betting group stage group first qualifying team
 * @apiSuccess (Reponse 200) {String} GPF='Group Forecast' The first order of the betting group stage group、Secondary team
 * @apiSuccess (Reponse 200) {String} TPS='Top Scorer' Betting on the player who scored the most goals in the entire tournament
 * @apiSuccess (Reponse 200) {String} FGS='First Goal Scorer' Betting on the player who scored the first goal in a match
 * @apiSuccess (Reponse 200) {String} FTS='FTS' Which team betting on legal time(90minute)Get the first goal or no goal
 * @apiSuccess (Reponse 200) {String} CP='Champion' At the designated event，Betting on which team can win the championship
 * @apiSuccess (Reponse 200) {String} DHCP='Double Hafu Score' Predicting two ball games in the board factory(45minute)And the audience(90minute)Official score
 * @apiSuccess (Reponse 200) {String} 6FH='6 HaFu' 6Bao half full court
 * 
 * @apiSuccessExample {json} Success-Response: 
 * HTTP/1.1 200 OK
 * {
 *     HAD: 'Home/Away/Draw', // Host and guest
 *     FHAD:'FHAD', // Predict the first half of a game
 *     HHAD:'Handicap Had', // Stronger team makes the ball to the weaker team
 *     HDC:'Handicap', // Betting on the ball after the adjustment
 *     HFT:'HaFu', // Predict the half of the game(45minute)And the audience(90minute)Host and guest results
 *     TQL:'To Qualify', // At the designated event，Betting on which team can advance to the next event
 *     CRS:'Correct Score', // Predict the official score of the game
 *     FCS:'FCS', // Betting on the first half of the legal time of a game45Minutes and the first half of the score
 *     TTG:'Total Goals', // Predict the number of goals scored by the two teams in the game
 *     OOE:'Odd/Even', // Predict the number of goals scored by the two teams in the game is singular or double
 *     HILO:'HILO', // The bettor may score more or less than the number specified by the pre-criminator for a match.(Medium sphere number)Bet
 *     FHL:'FHL', // Betting on the number of goals in the first half of a game，More or less than the specified number of balls
 *     CHLO:'Corner HiLo', // Betting on the specified game，The number of corner kicks jointly issued by the two teams*More or less than the specified number of corners
 *     PS:'Player specials', // Does not include overtime or mutual shots12Results after the code
 *     GPW:'Group Winner', // Betting group stage group first qualifying team
 *     GPF:'Group Forecast', // The first order of the betting group stage group、Secondary team
 *     TPS:'Top Scorer', // Betting on the player who scored the most goals in the entire tournament
 *     FGS:'First Goal Scorer', // Betting on the player who scored the first goal in a match
 *     FTS:'FTS', // Which team betting on legal time(90minute)Get the first goal or no goal
 *     CP:'Champion', // At the designated event，Betting on which team can win the championship
 *     DHCP:'Double Hafu Score', // Predicting two ball games in the board factory(45minute)And the audience(90minute)Official score
 *     '6FH':'6 HaFu', // 6Bao half full court *     
 * }
 *
 */