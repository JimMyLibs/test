
/**
 * @api {get} index/poolsList.json 所有玩法
 * @apiGroup Home
 * @apiVersion 0.0.1
 * @apiDescription 所有玩法
 * 
 * @apiParamExample {json} 使用方法:
 * {
 *      import api from '../middleware/api'
 * 
 *      // 获取筛选菜单
 *      const poolsList = api.Pools.list;
 * }
 * 
 * @apiSuccess (Reponse 200) {String} HAD='Home/Away/Draw' 主客和
 * @apiSuccess (Reponse 200) {String} FHAD='FHAD' 预测一场球赛的上半场赛果
 * @apiSuccess (Reponse 200) {String} HHAD='Handicap Had' 较强之球队让球于较弱之球队
 * @apiSuccess (Reponse 200) {String} HDC='Handicap' 投注经让球调整后之赛果
 * @apiSuccess (Reponse 200) {String} HFT='HaFu' 预测球赛中半场(45分钟)及全场(90分钟)之主客和赛果
 * @apiSuccess (Reponse 200) {String} TQL='To Qualify' 在指定赛事，投注哪队能晋级下一场赛事
 * @apiSuccess (Reponse 200) {String} CRS='Correct Score' 预测球赛的正式比分
 * @apiSuccess (Reponse 200) {String} FCS='FCS' 投注一场球赛法定时间上半场45分钟及上半场补时的比分
 * @apiSuccess (Reponse 200) {String} TTG='Total Goals' 预测球赛中两队的入球个数
 * @apiSuccess (Reponse 200) {String} OOE='Odd/Even' 预测球赛中两队的入球个数为单数或双数
 * @apiSuccess (Reponse 200) {String} HILO='HILO' 投注者可就一场球赛的入球个数高于或低于预判者所指定的数目(中位球数)下注
 * @apiSuccess (Reponse 200) {String} FHL='FHL' 投注一场球赛的上半场入球个数，多于或少于指定的球数
 * @apiSuccess (Reponse 200) {String} CHLO='Corner HiLo' 投注于指定球赛中，两队合共开出的角球个数*多于或少于指定的角球数
 * @apiSuccess (Reponse 200) {String} PS='Player specials' 不包括加时或互射12码后的赛果
 * @apiSuccess (Reponse 200) {String} GPW='Group Winner' 投注分组阶段小组首名出线队伍
 * @apiSuccess (Reponse 200) {String} GPF='Group Forecast' 投注分组阶段小组的顺序首、次出线队伍
 * @apiSuccess (Reponse 200) {String} TPS='Top Scorer' 投注整个锦标赛射入最多入球的球员
 * @apiSuccess (Reponse 200) {String} FGS='First Goal Scorer' 投注一场球赛中最先射入对方球门得分的球员
 * @apiSuccess (Reponse 200) {String} FTS='FTS' 投注哪队于法定时间(90分钟)获得第一个入球或无入球
 * @apiSuccess (Reponse 200) {String} CP='Champion' 在指定赛事，投注哪队能赢得冠军
 * @apiSuccess (Reponse 200) {String} DHCP='Double Hafu Score' 预测两场球赛中板厂(45分钟)及全场(90分钟)的正式比分
 * @apiSuccess (Reponse 200) {String} 6FH='6 HaFu' 6宝半全场
 * 
 * @apiSuccessExample {json} Success-Response: 
 * HTTP/1.1 200 OK
 * {
 *     HAD: 'Home/Away/Draw', // 主客和
 *     FHAD:'FHAD', // 预测一场球赛的上半场赛果
 *     HHAD:'Handicap Had', // 较强之球队让球于较弱之球队
 *     HDC:'Handicap', // 投注经让球调整后之赛果
 *     HFT:'HaFu', // 预测球赛中半场(45分钟)及全场(90分钟)之主客和赛果
 *     TQL:'To Qualify', // 在指定赛事，投注哪队能晋级下一场赛事
 *     CRS:'Correct Score', // 预测球赛的正式比分
 *     FCS:'FCS', // 投注一场球赛法定时间上半场45分钟及上半场补时的比分
 *     TTG:'Total Goals', // 预测球赛中两队的入球个数
 *     OOE:'Odd/Even', // 预测球赛中两队的入球个数为单数或双数
 *     HILO:'HILO', // 投注者可就一场球赛的入球个数高于或低于预判者所指定的数目(中位球数)下注
 *     FHL:'FHL', // 投注一场球赛的上半场入球个数，多于或少于指定的球数
 *     CHLO:'Corner HiLo', // 投注于指定球赛中，两队合共开出的角球个数*多于或少于指定的角球数
 *     PS:'Player specials', // 不包括加时或互射12码后的赛果
 *     GPW:'Group Winner', // 投注分组阶段小组首名出线队伍
 *     GPF:'Group Forecast', // 投注分组阶段小组的顺序首、次出线队伍
 *     TPS:'Top Scorer', // 投注整个锦标赛射入最多入球的球员
 *     FGS:'First Goal Scorer', // 投注一场球赛中最先射入对方球门得分的球员
 *     FTS:'FTS', // 投注哪队于法定时间(90分钟)获得第一个入球或无入球
 *     CP:'Champion', // 在指定赛事，投注哪队能赢得冠军
 *     DHCP:'Double Hafu Score', // 预测两场球赛中板厂(45分钟)及全场(90分钟)的正式比分
 *     '6FH':'6 HaFu', // 6宝半全场 *     
 * }
 *
 */