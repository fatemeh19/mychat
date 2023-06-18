import nodemailer  from 'nodemailer'
import nodemailerConfig from '../configs/nodemailerConfig.js'
const sendEmail = async ({from, to, subject, html})=>{

    const transporter = nodemailer.createTransport(nodemailerConfig)

    return transporter.sendMail({
        from,
        to,
        subject,
        html
    })

}
export default  sendEmail