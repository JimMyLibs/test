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
 * @apiSuccess (Reponse 200) {Number} resCode 200
 * @apiSuccess (Reponse 200) {String} message='success'
 * @apiSuccess (Reponse 200) {Object} data 数据
 * 
 * @apiSuccess (Reponse 200) {Object} data.betLegSelections 下注选择
 * @apiSuccess (Reponse 200) {Object} data.betLegSelections.idNO 彩种
 * @apiSuccess (Reponse 200) {string} data.betLegSelections.idNO.id id
 * @apiSuccess (Reponse 200) {Object} data.betLegSelections.idNO.priceType 价格类型
 * @apiSuccess (Reponse 200) {Object} data.betLegSelections.idNO.prices 价格
 * @apiSuccess (Reponse 200) {string} data.betLegSelections.idNO.prices.FIXED 固定价格
 * @apiSuccess (Reponse 200) {Number} data.betLegSelections.idNO.prices.FIXED.decimalPrice 小数
 * @apiSuccess (Reponse 200) {string} data.betLegSelections.idNO.prices.FIXED.priceType 价格类型
 * @apiSuccess (Reponse 200) {string} data.betLegSelections.idNO.selectionFeedId 选择ID
 * @apiSuccess (Reponse 200) {string} data.betLegSelections.idNO.selectionName 选择名称
 * @apiSuccess (Reponse 200) {Number} data.betLegSelections.idNO.selectionStatus 选择状态
 * @apiSuccess (Reponse 200) {Number} data.betLegSelections.idNO.validity 有效性
 * 
 * @apiSuccess (Reponse 200) {Object} data.betLegs 下注
 * @apiSuccess (Reponse 200) {Object} data.betLegs.idNO 彩种
 * @apiSuccess (Reponse 200) {string[]} data.betLegs.idNO.betLegSelections 下注选择
 * @apiSuccess (Reponse 200) {string} data.betLegs.idNO.competitionFeedId 比赛ID
 * @apiSuccess (Reponse 200) {string} data.betLegs.idNO.competitionName 比赛名称
 * @apiSuccess (Reponse 200) {string} data.betLegs.idNO.eventFeedId 事件ID
 * @apiSuccess (Reponse 200) {string} data.betLegs.idNO.eventName 事件名称
 * @apiSuccess (Reponse 200) {Number} data.betLegs.idNO.eventStatus 事件状态
 * @apiSuccess (Reponse 200) {string} data.betLegs.idNO.id id
 * @apiSuccess (Reponse 200) {Boolean} data.betLegs.idNO.isInPlay 是否比赛中
 * @apiSuccess (Reponse 200) {string} data.betLegs.idNO.marketFeedId 市场ID
 * @apiSuccess (Reponse 200) {string} data.betLegs.idNO.marketName 市场名称
 * @apiSuccess (Reponse 200) {Number} data.betLegs.idNO.marketStatus 市场状态
 * @apiSuccess (Reponse 200) {string} data.betLegs.idNO.marketTypeFeedId 市场类型ID
 * @apiSuccess (Reponse 200) {string} data.betLegs.idNO.regionFeedId 区域ID
 * @apiSuccess (Reponse 200) {string} data.betLegs.idNO.regionName 区域名称
 * @apiSuccess (Reponse 200) {string} data.betLegs.idNO.sportFeedId 运动ID
 * @apiSuccess (Reponse 200) {string} data.betLegs.idNO.sportName 运动名称
 * @apiSuccess (Reponse 200) {string} data.betLegs.idNO.startTimeUtc 开始时间
 * @apiSuccess (Reponse 200) {string[]} data.betLegs.idNO.teams 团队
 * @apiSuccess (Reponse 200) {string} data.betLegs.idNO.validity 有效期
 * 
 * @apiSuccess (Reponse 200) {Object} data.bets 赌博
 * @apiSuccess (Reponse 200) {Object} data.bets.idNO 彩种
 * @apiSuccess (Reponse 200) {string[]} data.bets.idNO.betLegs 下注
 * @apiSuccess (Reponse 200) {string} data.bets.idNO.betType 赌注类型
 * @apiSuccess (Reponse 200) {string} data.bets.idNO.ID
 * @apiSuccess (Reponse 200) {Boolean} data.bets.idNO.includedInMultiples 包含倍数
 * @apiSuccess (Reponse 200) {Boolean} data.bets.idNO.includedInPlace 包含下注
 * @apiSuccess (Reponse 200) {Number} data.bets.idNO.returnMultiplier 返回倍数
 * @apiSuccess (Reponse 200) {Object} data.bets.idNO.returns 返回
 * @apiSuccess (Reponse 200) {Number} data.bets.idNO.returns.amount  返回金额
 * @apiSuccess (Reponse 200) {string} data.bets.idNO.returns.currency 返回货币
 * @apiSuccess (Reponse 200) {Object} data.bets.idNO.stake 赌本
 * @apiSuccess (Reponse 200) {Number} data.bets.idNO.stake.amount 赌本金额
 * @apiSuccess (Reponse 200) {string} data.bets.idNO.stake.currency 赌本货币
 * @apiSuccess (Reponse 200) {Number} data.bets.idNO.stakeMultiplier 赌本倍数
 * @apiSuccess (Reponse 200) {Number} data.bets.idNO.status 状态
 * @apiSuccess (Reponse 200) {Number} data.bets.idNO.validity 有效期
 * @apiSuccess (Reponse 200) {Number} data.betslipState 赌场状态
 * 
 * @apiSuccess (Reponse 200) {Object} data.betslips 赌场
 * 
 * @apiSuccess (Reponse 200) {Object} data.betslips.CURRENT 当前
 * @apiSuccess (Reponse 200) {string[]} data.betslips.CURRENT.bets 
 * @apiSuccess (Reponse 200) {string} data.betslips.CURRENT.id 
 * @apiSuccess (Reponse 200) {Number} data.betslips.CURRENT.state 状态
 * @apiSuccess (Reponse 200) {Number} data.betslips.CURRENT.status 状态
 * @apiSuccess (Reponse 200) {Object} data.betslips.CURRENT.totalPotentialReturns 总潜在收益
 * @apiSuccess (Reponse 200) {Object} data.betslips.CURRENT.totalPotentialReturns.amount 总潜在收益金额
 * @apiSuccess (Reponse 200) {Object} data.betslips.CURRENT.totalPotentialReturns.currency 总潜在收益货币
 * @apiSuccess (Reponse 200) {Object} data.betslips.CURRENT.totalStake 
 * @apiSuccess (Reponse 200) {Object} data.betslips.CURRENT.totalStake.amount 赌本金额
 * @apiSuccess (Reponse 200) {Object} data.betslips.CURRENT.totalStake.currency 赌本货币
 * @apiSuccess (Reponse 200) {Number} data.betslips.HOLDING 开场 类似 CURRENT
 * @apiSuccess (Reponse 200) {Number} data.betslips.RECEIPT 收盘 类似 CURRENT
 * 
 * @apiSuccess (Reponse 200) {Object} data.betslips.keyboard 键盘
 * @apiSuccess (Reponse 200) {string} data.betslips.focusedBetId 焦点赌局ID
 * @apiSuccess (Reponse 200) {Number[]} data.betslips.quickValues 快速值
 * 
 * 
 * @apiSuccessExample {json} Response:
 * {
 *     resCode : 0000
 *     message : success
 *     data : {
 *          result : ok
 *     }
 * }
 */