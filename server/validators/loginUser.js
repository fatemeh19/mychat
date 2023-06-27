import yup from 'yup'

const loginUser = yup.object({
    email:yup.string().email('FormatError').required('EmptyError'),
    password:yup.string().required('EmptyError')
})

export default  loginUser