import yup from 'yup'
import { messageType } from '../utils/enums.js'

const editMessage = yup.object({
    content:yup.object({
        text:yup.string()
    }),
})

export default editMessage