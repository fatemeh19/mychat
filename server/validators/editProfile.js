import yup from 'yup'
const phoneRegExp =/^(\+98|0)?9\d{9}$/
const editProfile = yup.object({
    name:yup.string(). required(),
    lastname:yup.string(),
    username:yup.string(),
    phoneNumber:yup.string().matches(phoneRegExp). required(),
    bio:yup.string()
})

export default editProfile