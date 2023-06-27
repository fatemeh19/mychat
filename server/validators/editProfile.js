import yup from 'yup'

const editProfile = yup.object({
    name:yup.string().nullable(false),
    lastname:yup.string().nullable(false),
    username:yup.string().nullable(false),
    phoneNumber:yup.string().nullable(false)
})

export default editProfile