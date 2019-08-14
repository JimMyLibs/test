import account from './account'
import { $post, $get } from '../../fetch/Http'
import { url } from './index'

export const sell = ()=>{
    const { serverId, channelId, accountNumber, sequenceNumber, sessionId, betDetails, inPlayDelay, flag } = account.sell;
    return $get(`${url}/${serverId}/${channelId}/${accountNumber}/${sequenceNumber}/${sessionId}/${betDetails}/${inPlayDelay}/${flag}/sell`,{
        headers: {
            'X-Forwarded-For': '123',
            'X-Request-ID': '456',
        },
        body:{
            mock:{
                result: 0,
                message: '03100003;12345\\0$497750.00\\00003$70.0015/00213AUG190$10.00\\$497680.00\\10:26 13/-08/-2019\\',
            }
        }
    })
}