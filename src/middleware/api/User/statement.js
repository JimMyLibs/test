import account from './account'
import { $post, $get } from '../../fetch/Http'
import { url } from './index'

export const statement = ()=>{
    const res = {
        result: 0,
        message: `0E/@@@A210$$DIGCF@.@@/BALANCE AT START OF BUSINESS 22-AUG-2019
                    !@@@B380$$/22-AUG-2019 14:41  INTERNET  
                    !@@@E380$$/22-AUG-2019 14:45  INTERNET  
                    !@@@H380$$/22-AUG-2019 14:45  INTERNET  
                    !@@AA380$$/22-AUG-2019 15:10  INTERNET  

                    !@@AA380$$/22-AUG-2019 15:10  INTERNET  

                    !@@AD380$$/22-AUG-2019 15:10  INTERNET  
                    !@@AG380$$/22-AUG-2019 15:10  INTERNET  
                    !`,
    }
    return {
        ErrCode: 0,
        ErrMsg: '',
        data: {

        }
    }

    // const { serverId, channelId, accountNumber, sequenceNumber, sessionId, statementDetails, transFilter } = account.statement;
    // return $get(`${url}/${serverId}/${channelId}/${accountNumber}/${sequenceNumber}/${sessionId}/${statementDetails}/statement`,{
    //     headers: {
    //         'X-Forwarded-For': '123',
    //         'X-Request-ID': '456',
    //     },
    //     body:{

    //     }
    // })
}