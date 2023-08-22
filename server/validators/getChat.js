import yup from 'yup'
import { chatType } from '../utils/enums.js'
import { chatSearchType } from '../utils/enums.js'
const getChat = yup.object({
    findBy: yup.string().oneOf(chatSearchType).required(),
    memberIds :yup.array().length(2).when('findBy',{
        is:'memberIds',
        then:(getChat)=> getChat.required(),
    }),
    id :yup.string().when('findBy',{
        is:'chatId',
        then:(getChat)=> getChat.required(),
    }),

})

export default getChat