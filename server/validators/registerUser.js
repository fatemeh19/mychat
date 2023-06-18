// import * as yup from 'yup'
import yup from 'yup'

const registerUserV = yup.object({
    email:yup.string().email('FormatError').required('EmptyError'),
    password:yup.string().required('EmptyError')
})

export default  registerUserV