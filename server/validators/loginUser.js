import yup from 'yup'
import * as regex from '../utils/regex.js'
const loginUser = yup.object({
    email:yup.string().email().matches(regex.email,'FormatError').required('EmptyError'),
    password:yup.string().required('EmptyError')
})

export default  loginUser