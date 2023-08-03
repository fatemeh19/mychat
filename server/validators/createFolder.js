import yup from 'yup'

const createFolder = yup.object({
    name:yup.string().max(10).required('EmptyError'),
    chatIds:yup.array().min(1).required('EmptyError'),
})

export default createFolder