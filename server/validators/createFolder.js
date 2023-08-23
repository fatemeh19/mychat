import yup from 'yup'

const createFolder = yup.object({
    name:yup.string().max(10). required(),
    chatIds:yup.array().min(1). required(),
})

export default createFolder