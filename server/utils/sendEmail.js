const nodemailer = require('nodemailer')
const nodemailerConfig = require('../configs/nodemailerConfig')
const sendEmail = async ({from, to, subject, html})=>{

    const transporter = nodemailer.createTransport(nodemailerConfig)

    return transporter.sendMail({
        from,
        to,
        subject,
        html
    })

}
module.exports = sendEmail