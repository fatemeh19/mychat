import yup from 'yup'
import { chatType } from '../utils/enums.js'
let createChat = yup.object({
    chatType:yup.string().oneOf(chatType,'EnumError').required('EmptyError'),
    memberIds:yup.array().required('EmptyError'),
    name:yup.string().when('chatType',{
       is:'group',
       then: (createChat) => createChat.required('EmptyError')
    })
})

export default createChat