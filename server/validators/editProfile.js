import yup from 'yup'
const phoneRegExp =/^(\+98|0)?9\d{9}$/
const editProfile = yup.object({
    name:yup.string().required('EmptyError'),
    lastname:yup.string(),
    username:yup.string(),
    phoneNumber:yup.string().matches(phoneRegExp,"EmptyError").required('EmptyError'),
    bio:yup.string()
})

export default editProfile