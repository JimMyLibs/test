import { $post, $get } from '../fetch/Http'

const reqDates = ['0530', '0612', 'xml'];
export const curDate = reqDates[2];

class Api {
    constructor() {
        
    }
    FB_GetInfo_chi() {// 2.2.4.7
        return $get(`${curDate}/FB_GetInfo_chi.xml`).then(res=>{
            console.log('FB_GetInfo_chi_res',res,res.AOSBS_XML.Coupons.CouponInfo[0].Matches.MatchInfo[0]);

            const { Coupons, TournamentPools } = res.AOSBS_XML;

            return Coupons;
        }).catch(err=>{
            return err;
        })
    }
    FB_GetInfo_eng() {// 2.2.4.7
        return $get(`${curDate}/FB_GetInfo_eng.xml`).then(res=>{
            // console.log('FB_GetInfo_eng_res',res,res.AOSBS_XML.Coupons.CouponInfo[0].Matches.MatchInfo[0]);
            console.log('FB_GetInfo_eng_res',JSON.stringify(res));

            
            return res;
        })
    }

}
export default new Api()
