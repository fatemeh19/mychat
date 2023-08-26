import yup from 'yup'
import { chatType } from '../utils/enums.js'
let createChat = yup.object({
    chatType:yup.string().oneOf(chatType). required(),
    memberIds:yup.array(). required(),
    name:yup.string().when('chatType',{
       is:'group',
       then: (createChat) => createChat. required()
    })
})

export default createChat