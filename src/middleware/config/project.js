import { getAppName, getEnv } from './env'

export const projectName = 'szhkjc';

export const fetchType = 'publicFetchType';// 决定请求地址类型分类

export const fetchCache = 0;// 是否缓存请求

export const ISAPP = fetchType !== 'web';

export const ISDEV = getEnv()&&0;// 决定请求地址环境分类

export const ISDEBUG = 1;// 是否显示打印信息

// 生产环境api地址: `${location.origin}/api.v1.json`
// 生产环境apiUrl为空时调用apiUrls['pro']
export const serverOriginUrl = `http://iosbstxn.qcew.com:65443/config/GetPara.xml`;// 获取API地址前缀

export const serverPathUrl = ``;// 获取API地址后缀

export const mockUrl = 'http://mock.91525.net:35001/';



ISDEBUG&&console.log('——————————【 projectInfo 】——————————',{projectName,fetchType,ISAPP,ISDEV})