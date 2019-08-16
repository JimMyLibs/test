// 获取当前主机本地ip地址，兼容windows及Unix

const os = require('os')

/**
 * [getIp 获取当前主机本地ip地址，兼容windows及Unix]
 * @param  {String} [ip='127.0.0.1'] [获取失败时返回的IP地址，默认值为'127.0.0.1']
 * @return {String}                  [返回获取到的ip地址]
 */
export default function getIp(ip = '127.0.0.1'){
  try{
    const emptyReg = /[\s\r\n]+/g
    // 去除属性名中可能存在的多余空格，如: " address" => "address"
    let network = JSON.parse(JSON.stringify(os.networkInterfaces()).replace(emptyReg, ''))

    // 获取本地连接信息数组，包括IPv4和IPv6
    let ipArr = network['en0'] || network['本地连接']

    // 获取本地连接信息中IPv4项对应的IP地址
    if( Array.isArray( ipArr )){
      let rightItem = ipArr.find(item => item.family && item.family.toLowerCase() === 'ipv4')
      if(rightItem && rightItem.address){
        ip = rightItem.address
      }
    }
    return ip
  }catch(e){
    return ip
  }
}
