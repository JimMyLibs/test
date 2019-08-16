export const check = {
    serverId: 223,
    channelId: 10,
    accountNumber: '03100003',
    sequenceNumber: 34567,
    sessionId: '012345678901234567891234',
}
export const statement = {
    serverId: 222,
    channelId: 10,
    accountNumber: '03100003',
    sequenceNumber: 12345,
    sessionId: '012345678901234567891234',
    statementDetails: encodeURIComponent('S18/09/2010/0,1,2,3,4,5,6,7,8,9'),
    transFilter: {},
}
export const sell = {
    serverId: 322,
    channelId: 10,
    accountNumber: '03100003',
    sequenceNumber: 12345,
    sessionId: '012345678901234567891234',
    betDetails: encodeURIComponent('ST SUN WIN 1*1+5 $10\\'),
    inPlayDelay: 0,
    flag: 'N',
}
export default {
    check, statement, sell
}