import cryptoRandomString from 'crypto-random-string'
import './loadEnv.js'
export default ()=>{
    return cryptoRandomString({length: 30, type: 'url-safe'})
}
