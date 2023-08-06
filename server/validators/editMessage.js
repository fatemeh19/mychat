import yup from 'yup'
import { messageType } from '../utils/enums.js'

const editMessage = yup.object({
    content:yup.object({
        contentType:yup.string().oneOf(messageType,'EnumError').required('EmptyError'),
        text:yup.string().when("contentType",{
            is:"text",
            then:(schema)=>schema.required('EmptyError')
        }),
    }),
})

export default editMessage