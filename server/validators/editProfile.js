import yup from 'yup'
import * as regex from '../utils/regex.js'

const editProfile = yup.object({
    name:yup.string().required(),
    lastname:yup.string(),
    username:yup.string(),
    phoneNumber:yup.string().matches(regex.phoneNumber).required(),
    bio:yup.string()
})

export default editProfile