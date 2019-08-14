import account from './account'
import { $post, $get } from '../../fetch/Http'
import { url } from './index'

export const statement = ()=>{
    const { serverId, channelId, accountNumber, sequenceNumber, sessionId, statementDetails, transFilter } = account.statement;
    return $get(`${url}/${serverId}/${channelId}/${accountNumber}/${sequenceNumber}/${sessionId}/${statementDetails}/statement`,{
        headers: {
            'X-Forwarded-For': '123',
            'X-Request-ID': '456',
        },
        body:{
            mock:{
                result: 404,
                message: '',    
            }
        }
    })
}