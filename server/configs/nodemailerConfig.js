import '../utils/loadEnv.js'
const nodeMailerConfig = {

    service:'gmail',
    host:'stmp@gmail.com',
    secure:false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
}
export default nodeMailerConfig