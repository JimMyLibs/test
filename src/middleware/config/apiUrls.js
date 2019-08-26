import getIp from '../utils/evn/getIp';

const locIp = 'http://127.0.0.1:8803/';
const devWifi = 'http://192.168.137.1:8803/';

export default {
    dev:{
        Txn: locIp,
        Info: locIp,
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
