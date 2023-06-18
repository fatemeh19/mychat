import yup from 'yup'

const loginUserV = yup.object({
    email:yup.string().email('FormatError').required('EmptyError'),
    password:yup.string().required('EmptyError')
})

export default  loginUserV