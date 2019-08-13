import account from './account'
import { $post, $get } from '../../fetch/Http'

const url = 'http://10.194.104.2:11698/api/Transactions'
export const statement = ()=>{
    const { serverId, channelId, accountNumber, sequenceNumber, sessionId, statementDetails, transFilter } = account.statement;
    return $get(`${url}/${serverId}/${channelId}/${accountNumber}/${sequenceNumber}/${sessionId}/${statementDetails}/statement`,{
        headers: {
            'X-Forwarded-For': '123',
            'X-Request-ID': '456',
        }
    })
}