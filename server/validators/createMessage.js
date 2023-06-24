import yup from 'yup'
import { messageType } from '../utils/enums.js'
import ErroMessages from '../messages/errors.js'

const createMessage = yup.object({
    content:yup.object({
        contentType:yup.string().oneOf(messageType,'EnumError').required('EmptyError'),
        text:yup.string()
    }),
    senderId:yup.string().required('EmptyError')

})

export default createMessage