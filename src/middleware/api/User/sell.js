import account from './account'
import { $post, $get } from '../../fetch/Http'

const url = 'http://10.194.104.2:11698/api/Transactions'
export const sell = ()=>{
    const { serverId, channelId, accountNumber, sequenceNumber, sessionId, betDetails, inPlayDelay, flag } = account.sell;
    return $get(`${url}/${serverId}/${channelId}/${accountNumber}/${sequenceNumber}/${sessionId}/${betDetails}/${inPlayDelay}/${flag}/sell`,{
        headers: {
            'X-Forwarded-For': '123',
            'X-Request-ID': '456',
        }
    })
}