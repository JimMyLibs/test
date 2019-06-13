/**
 * @api {get} /sportsbook.json sportsbook
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
 * @apiSuccess (Reponse 200) {Object} data.competitions 比赛
 * @apiSuccess (Reponse 200) {Object} data.competitions.com_ad1 
 * @apiSuccess (Reponse 200) {Object} data.competitions.com_ad1.competitionFeedId='com_ad1' 
 * @apiSuccess (Reponse 200) {Object} data.competitions.com_ad1.competitionName='__competition__ad1' 
 * @apiSuccess (Reponse 200) {Object} data.competitions.com_epl 同上
 * @apiSuccess (Reponse 200) {Object} data.competitions.com_gsl 同上
 * @apiSuccess (Reponse 200) {Object} data.competitions.com_isa 同上
 * @apiSuccess (Reponse 200) {Object} data.competitions.com_jd1 同上
 * @apiSuccess (Reponse 200) {Object} data.competitions.com_sfl 同上
 * 
 * @apiSuccess (Reponse 200) {Object} data.competitors 竞争对手
 * 
 * @apiSuccess (Reponse 200) {Object} data.events 事件(首页列表)
 * @apiSuccess (Reponse 200) {Object} data.events.FB128296 事件 
 * @apiSuccess (Reponse 200) {Number} data.events.FB128296.categories 类别
 * @apiSuccess (Reponse 200) {String} data.events.FB128296.eventFeedId 事件反馈ID
 * @apiSuccess (Reponse 200) {String} data.events.FB128296.eventName 事件名称
 * @apiSuccess (Reponse 200) {Number} data.events.FB128296.eventStatus 事件状态
 * @apiSuccess (Reponse 200) {Boolean} data.events.FB128296.isInPlay 是否进行中
 * @apiSuccess (Reponse 200) {Boolean} data.events.FB128296.isOff 是否关闭
 * @apiSuccess (Reponse 200) {String[]} data.events.FB128296.markets 市场
 * @apiSuccess (Reponse 200) {Date} data.events.FB128296.startTimeUtc 开始时间UTC
 * @apiSuccess (Reponse 200) {String[]} data.events.FB128296.teams 团队
 * @apiSuccess (Reponse 200) {Object} data.events.FBxxx 104个同上
 * 
 * @apiSuccess (Reponse 200) {Object} data.markets 市场
 * @apiSuccess (Reponse 200) {Object} data.markets.mar_0a963e12 
 * @apiSuccess (Reponse 200) {Boolean} data.markets.mar_0a963e12.isInPlay 是否进行中
 * @apiSuccess (Reponse 200) {String} data.markets.mar_0a963e12.marketBand 市场波段
 * @apiSuccess (Reponse 200) {String} data.markets.mar_0a963e12.marketFeedId 市场反馈ID
 * @apiSuccess (Reponse 200) {String} data.markets.mar_0a963e12.marketName 市场名称
 * @apiSuccess (Reponse 200) {Number} data.markets.mar_0a963e12.marketStatus 市场状况
 * @apiSuccess (Reponse 200) {String} data.markets.mar_0a963e12.marketType 市场类型
 * @apiSuccess (Reponse 200) {String} data.markets.mar_0a963e12.marketTypeFeedId 市场类型反馈ID
 * @apiSuccess (Reponse 200) {Object} data.markets.mar_xxx 616个同上
 * 
 * @apiSuccess (Reponse 200) {Object} data.regions 区域
 * @apiSuccess (Reponse 200) {Object} data.regions.reg_a8c45cd6 
 * @apiSuccess (Reponse 200) {String[]} data.regions.reg_a8c45cd6.competitions 比赛
 * @apiSuccess (Reponse 200) {String[]} data.regions.reg_a8c45cd6.marketTypes 市场类型
 * @apiSuccess (Reponse 200) {String} data.regions.reg_a8c45cd6.regionFeedId 区域反馈ID
 * @apiSuccess (Reponse 200) {String} data.regions.reg_a8c45cd6.regionName 地区名称
 * 
 * @apiSuccess (Reponse 200) {Object} data.selections 选择
 * @apiSuccess (Reponse 200) {Object} data.sel_0a2a3a87 
 * @apiSuccess (Reponse 200) {Object} data.sel_0a2a3a87.currentPrices 当前价格
 * @apiSuccess (Reponse 200) {Object} data.sel_0a2a3a87.currentPrices.FIXED 固定
 * @apiSuccess (Reponse 200) {Number} data.sel_0a2a3a87.currentPrices.FIXED.decimalPrice 小数价格
 * @apiSuccess (Reponse 200) {String} data.sel_0a2a3a87.currentPrices.FIXED.priceType 价格类型
 * @apiSuccess (Reponse 200) {Object} data.sel_0a2a3a87.selectionFeedId 选择反馈ID
 * @apiSuccess (Reponse 200) {Object} data.sel_0a2a3a87.selectionName 选择名称
 * @apiSuccess (Reponse 200) {Object} data.sel_0a2a3a87.selectionStatus 选择状态
 * @apiSuccess (Reponse 200) {Object} data.sel_xxx 3780个同上 
 * 
 * @apiSuccess (Reponse 200) {Object} data.sports 运动
 * @apiSuccess (Reponse 200) {Object} data.spo_0 
 * @apiSuccess (Reponse 200) {String[]} data.spo_0.regions 区域
 * @apiSuccess (Reponse 200) {String} data.spo_0.sportFeedId 运动反馈ID
 * @apiSuccess (Reponse 200) {String} data.spo_0.sportName 运动名称
 * 
 * @apiSuccess (Reponse 200) {Object} data.teams 团队
 * @apiSuccess (Reponse 200) {Object} data.teams.tea_acm 
 * @apiSuccess (Reponse 200) {Object} data.teams.tea_acm.id 团队ID
 * @apiSuccess (Reponse 200) {Object} data.teams.tea_acm.teamFeedId 团队反馈ID
 * @apiSuccess (Reponse 200) {Object} data.teams.tea_acm.teamName 团队名称
 * @apiSuccess (Reponse 200) {Object} data.teams.tea_xxx 104同上
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