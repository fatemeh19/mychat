import yup from 'yup'
import { messageType } from '../utils/enums.js'

const createMessage = yup.object({
    content:yup.object({
        // contentType:yup.string().oneOf(messageType,'EnumError'). required(),
        text:yup.string(),
        file:yup.string()
    }),
    // senderId:yup.string(). required(),
    reply:yup.object({
        isReplied:yup.boolean(),
        messageId:yup.string().when("isReplied",{
            is:true,
            then:(schema)=> schema. required()
        })
    })

})

export default createMessage