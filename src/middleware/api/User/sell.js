import account from './account'
import { $post, $get } from '../../fetch/Http'
import { url } from './index'

export const sell = ()=>{
    const res = {
        result: 0,
        message: '03100003;12345\\0$497590.00\\00012$20.00\\$497570.00\\09:42 15/-08/-2019\\',
    }
    
    return {
        ErrCode: 0,
        ErrMsg: '',
        data: res
    }

    // const { serverId, channelId, accountNumber, sequenceNumber, sessionId, betDetails, inPlayDelay, flag } = account.sell;
    // return $get(`${url}/${serverId}/${channelId}/${accountNumber}/${sequenceNumber}/${sessionId}/${betDetails}/${inPlayDelay}/${flag}/sell`,{
    //     headers: {
    //         'X-Forwarded-For': '123',
    //         'X-Request-ID': '456',
    //     },
    //     body:{
    //         mock:{
    //             result: 0,
    //             message: '03100003;12345\\0$497590.00\\00012$20.00\\$497570.00\\09:42 15/-08/-2019\\',
    //         }
    //     }
    // })
}