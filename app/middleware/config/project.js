import { getAppName, getEnv, getLanguage } from './env'

export const projectName = 'szhkjc';

export const fetchType = '';// 决定请求地址origin,多种type在Http实例化时订制

export const language = getLanguage();// 决定请求地址origin,多种type在Http实例化时订制

export const useFetfchCache = 0;// 是否缓存请求

export const ISAPP = getAppName() !== 'web';

export const ISDEV = getEnv()&&1;// 决定请求地址环境分类

export const ISDEBUG = 0;// 是否显示打印信息

// 生产环境apiUrl为空时调用apiUrls['pro']
export const serverOriginUrl = ``;// 获取API地址前缀

export const serverPathUrl = `http://iosbstxn.qcew.com:65443/config/GetPara.xml`;// 获取API地址后缀


export const mockUrl = 'http://mock.91525.net:35001/';



// ISDEBUG&&console.log('——————————【 projectInfo 】——————————',{projectName,fetchType,ISAPP,ISDEV})