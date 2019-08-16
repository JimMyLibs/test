import getIp from '../utils/evn/getIp';

const locIp = getIp();
const devWifi = 'http://192.168.137.1:8803/';

export default {
    dev:{
        Txn: `http://${locIp}:8803/`,
        Info: `http://${locIp}:8803/`,
        mobile: 'https://iosbstxn01.qcew.com:65443/',
        evn: 'dev',
    },
    pro:{ 
        Txn: 'https://iosbstxn.qcew.com:65443/',
        Info: 'https://iosbsinfo.qcew.com:65443/',
        mobile: 'https://iosbstxn01.qcew.com:65443/',
        evn: 'pro',
    }
}
