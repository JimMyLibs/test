import { $upload, $post, $get } from '../../fetch/Http'

const res = {    
    access_token: '5e2a93eb-9382-343f-876a-a0b',
    refresh_token: '9ce3ce74-d714-3a36-9eb5-ca9800c94c8f',
    scope: 'default',
    token_type: 'Bearer',
    expires_in: 1087,
}


const getBase64 = (str='')=>{
    return Buffer.from(str).toString('base64');
}
const OAuth2 = {
    key: '',
    secret: '',
}
const account = {
    username: '',
    password: '',
}
const grant = `grant_type=password&username=${account.username}&password=${account.password}`

export const oauth2 = ()=>{
    return {
        ErrCode: 0,
        ErrMsg: '',
        data: res
    }

    // return $post('https://auth.hkjc.com:9443/oauth/token',{
    //     hearders:{
    //         Authorization: `Basic ${getBase64(OAuth2.key+':'+OAuth2.secret)}`,            
    //     },
    //     // body: grant,
    // })
}