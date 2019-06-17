const { $post, $get } = require('../fetch/Http')

const reqDates = ['0530', '0612', 'xml'];
const curDate = reqDates[2];

class Api {
    constructor() {
        this.xml_versions();
    }
    xml_versions() {// 下注
        $get(`${curDate}/FB_GetInfo_chi.xml`).then(res=>{
            console.log('xml_versions_res',res);
        })
    }
    betslip() {// 下注
        return $get(`${curDate}/betslip.json`);
    }
    currentUser() {// 当前用户
        return $get(`${curDate}/currentUser.json`);
    }
    sportsbook() {// 赛事预定
        return $get(`${curDate}/sportsbook.json`);
    }
    versions() {// 版本
        return $get(`${curDate}/versions.json`);
    }

    async getEvents() {
        const sports = await this.sportsbook();
        let { events, markets, teams } = sports;
        Object.keys(events).map((item)=>{
            events[item].markets = events[item].markets.map(cell=>{
                return markets[cell];
            })
            events[item].teams = events[item].teams.map(cell=>{
                return teams[cell];
            })
        })
        return events;
    }

}
module.exports = new Api()
