import yup from 'yup'
import { chatType } from '../utils/enums.js'

const getChat = yup.object({
    chatType: yup.string().oneOf(chatType,"EnumError").required("EmptyError"),
    memberIds :yup.array().length(2).when('chatType',{
        is:'private',
        then:(getChat)=> getChat.required("EmptyError"),
    }),
    id :yup.string().when('chatType',{
        is:'group',
        then:(getChat)=> getChat.required("EmptyError"),
    }),

})

export default getChat