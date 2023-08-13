import yup from 'yup'
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

export default yup.object({
    name:yup.string().required('EmptyError'),
    lastname:yup.string(),
    phoneNumber:yup.string(),
    username:yup.string()
})