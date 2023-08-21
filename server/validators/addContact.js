import yup from 'yup'

export default yup.object({
    name:yup.string().required('EmptyError'),
    lastname:yup.string(),
    phoneNumber:yup.string(),
    username:yup.string()
})