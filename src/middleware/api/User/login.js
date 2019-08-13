import { $upload } from '../../fetch/Http'

export const login = ()=>{
    console.log('login调用成功')
    return $upload('https://iosbstxn01.qcew.com:65443/txn/IOSBS/Authentication.ashx', {
        body: {
            UserId: '20025850',
            Password: 'D13149DE00848EB013CAD318D27829DB64B965D7',
            Lang: 'zh-HK',
            isEWallet: '1',
            reAuthentication: '0'
        }
    })
}

const login2 = ()=>{
    $upload('https://iosbstxn01.qcew.com:65443/txn/IOSBS/Authentication.ashx', {
        body: {
            UserId: '20025850',
            Password: 'D13149DE00848EB013CAD318D27829DB64B965D7',
            Lang: 'zh-HK',
            isEWallet: '1',
            reAuthentication: '0'
        }
    }).then(response => {
        console.warn('登陆', response);
        const responseObj = response.TXN_XML;
        if (responseObj.ErrCode === '0') {
            // success
            alert('LoginSuccess');
            // saveUserInfo
            set('UserID', '20025850');
            set('SequenceNumber', responseObj.SequenceNumber);
            set('BetAccount', responseObj.BetAccount);
            set('SessionId', responseObj.SessionId);
            this.props.navigation.navigate('App');
        } else {
            alert('LoginFailed');
            this.props.navigation.navigate('App');
        }
    }).catch(error => {
        alert(error);
        this.props.navigation.navigate('App');
    });
}