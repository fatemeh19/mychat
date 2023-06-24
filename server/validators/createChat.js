import yup from 'yup'
import mongoose from 'mongoose'
const createChat = yup.object({
    memberIds:yup.array().required('EmptyError').length(2)
})

export default createChat