import account from './account'
import { $post, $get } from '../../fetch/Http'
import { url } from './index'

export const check = ()=>{
    const { serverId, channelId, accountNumber, sequenceNumber, sessionId } = account.check;
    return $get(`${url}/${serverId}/${channelId}/${accountNumber}/${sequenceNumber}/${sessionId}/check`,{
        headers: {
            'X-Forwarded-For': '123',
            'X-Request-ID': '456',
        },
        body:{
            mock:{
                result: 0,
                message: '0$497680.00\\\u0000\\0',
            }
        }
    })
}