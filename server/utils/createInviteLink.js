import crypto from 'crypto'
import './loadEnv.js'
export default ()=>{
    return 'mychat.me/'+crypto
    .createHash("sha256")
    .update(process.env.INVITE_LINK_KEY)
    .digest("base64")

}
