
/**
 * @api {get} /filter 获取筛选菜单
 * @apiGroup Home
 * @apiVersion 0.0.1
 * @apiDescription 包括 玩法列表、联赛列表、日期列表
 * 
 * @apiParamExample {json} 使用方法:
 * {
 *     const { data: filterList } = await api.Matches.filter();
 *     const { poolList, leagueList, dateList } = filterList;
 * }
 * 
 * @apiSuccess (Reponse 200) {Object[]} data
 * @apiSuccess (Reponse 200) {Object} data.poolList 玩法列表
 * @apiSuccess (Reponse 200) {String[]} data.leagueList 联赛列表
 * @apiSuccess (Reponse 200) {String[]} data.dateList 日期列表
 * 
 * @apiSuccessExample {json} Success-Response: 
 * HTTP/1.1 200 OK
 * {
 *     ErrCode: 0,
 *     ErrMsg: "",
 *     data: [
 *          poolList: {
 *              CHL: "Corner HiLo",
 *              CRS: "Correct Score",
 *              FCS: "FCRS",
 *              FGS: "First Goal Scorer",
 *              FHA: "FHAD",
 *              FHL: "FHL",
 *              FTS: "FTS",
 *              HAD: "Home/Away/Draw",
 *              HDC: "Handicap",
 *              HFT: "HaFu",
 *              HHA: "Handicap Had",
 *              HIL: "HILO",
 *              OOE: "Odd/Even",
 *              TQL: "To Qualify",
 *              TTG: "Total Goals"
 *          },
 *          leagueList: ["歐洲國家盃", "澳洲職業聯賽", "法國聯賽盃", "日本職業聯賽", "南美自由盃", "英格蘭超級聯賽"],
 *          dateList: ["08/10(THU)", "10/10(SAT)", "11/10(SUN)", "12/10(MON)", "13/10(TUE)", "14/10(WED)"],
 * 
 *     ]
 * }
 *
 */