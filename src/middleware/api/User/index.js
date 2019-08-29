import { check } from './check'
import { statement } from './statement'
import { sell } from './sell'
import { login } from './login'
import { oauth2 } from './oauth2'

export const url = 'http://10.194.104.2:11698/api/Transactions';
export default {
    check,
    statement,
    sell,
    login,
    oauth2,
}