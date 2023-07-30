import yup from 'yup'

export default yup.object({
    name:yup.string().required('EmptyError'),
    description:yup.string(),
})