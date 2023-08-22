// import * as yup from 'yup'
import yup from 'yup'
import * as regex from '../utils/regex.js'

const registerUser = yup.object({
    email:yup.string().email().matches(regex.email).required(),
    password:yup.string(). required()
})

export default  registerUser