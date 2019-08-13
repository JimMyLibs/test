import account from './account'
import { $post, $get } from '../../fetch/Http'

const url = 'http://10.194.104.2:11698/api/Transactions'
export const check = ()=>{
    console.log('check调用成功')
    const { serverId, channelId, accountNumber, sequenceNumber, sessionId } = account.check;
    return $get(`${url}/${serverId}/${channelId}/${accountNumber}/${sequenceNumber}/${sessionId}/check`,{
        headers: {
            'X-Forwarded-For': '123',
            'X-Request-ID': '456',
        }
    })
}