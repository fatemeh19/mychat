import yup from 'yup'
import * as regex from '../utils/regex.js'

const setInfo = yup.object({
    name:yup.string().required(),
    lastname:yup.string().required(),
    phoneNumber:yup.string().matches(regex.phoneNumber,'FormatError').required(),
})


export default  setInfo