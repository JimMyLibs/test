
/**
 * @api {get} /filter getFilterList
 * @apiGroup Home
 * @apiVersion 0.0.2
 * @apiDescription include Game list、League list、Date list
 * 
 * @apiParamExample {json} Instructions:
 * {
 *     const { data: filterList } = await api.Matches.filter();
 *     const { poolList, leagueList, dateList } = filterList;
 * }
 * 
 * @apiSuccess (Reponse 200) {Object[]} data
 * @apiSuccess (Reponse 200) {Object} data.poolList Game list
 * @apiSuccess (Reponse 200) {String[]} data.leagueList League list
 * @apiSuccess (Reponse 200) {String[]} data.dateList Date list
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
 *          leagueList: ["European Nations Cup", "Australian Professional League", "French League Cup", "Japanese professional league", "South American Freedom Cup", "English Premier League"],
 *          dateList: ["08/10(THU)", "10/10(SAT)", "11/10(SUN)", "12/10(MON)", "13/10(TUE)", "14/10(WED)"],
 * 
 *     ]
 * }
 *
 */