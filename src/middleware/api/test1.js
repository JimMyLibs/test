import { $post, $get } from '../fetch/Http'

const reqDates = ['0530', '0612', 'xml'];
export const curDate = reqDates[2];

class Api {
    constructor() {
        
    }
    async getData(name) {
        try{
            const LSdata = localStorage.getItem(name);
            if(LSdata){
                return JSON.parse(LSdata);// 100ms
            }else{
                const reult = await $get(`${curDate}/${name}`);// 300ms
                localStorage.setItem(name,JSON.stringify(reult));
                return reult;
            }
        }catch(err){
            throw err;
        }
    }
    async FB_GetInfo_chi() {// 2.2.4.7
        try{
            const reult = await this.getData('FB_GetInfo_chi.xml');
            const { Coupons, TournamentPools } = reult.AOSBS_XML;
            
            return Coupons;
        }catch(err){
            throw err;
        }
    }

}
export default new Api()
