import { isRN, isDev } from './env'

export const projectName = 'szhkjc';

export const fetchType = 'Info';// 决定请求地址origin,多种type在Http实例化时订制

export const useFetfchCache = 1;// 是否启用请求缓存-硬盘
export const useCaseCache = 1;// 是否启用实例缓存-内存

export const ISAPP = isRN();

export const ISDEV = isDev();// 决定请求地址环境分类


// 生产环境apiUrl为空时调用apiUrls['pro']
export const serverOriginUrl = {
    dev: ``,// 获取API地址前缀
    pro: ``,// 获取API地址前缀
}

export const serverPathUrl = {
    dev: `http://127.0.0.1:8803/config/GetPara_dev.xml`,// 获取API地址后缀
    pro: `http://127.0.0.1:8803/config/GetPara_pro.xml`,// 获取API地址后缀
}

/********************************** debug **************************** */

export const ISDEBUG = 1;// 是否显示打印信息

export const useJson = 0;

export const mockUrl = 'http://mock.91525.net:35001/';
// export const mockUrl = 'http://127.0.0.1:3001/';



// ISDEBUG&&console.log('——————————【 projectInfo 】——————————',{projectName,fetchType,ISAPP,ISDEV})