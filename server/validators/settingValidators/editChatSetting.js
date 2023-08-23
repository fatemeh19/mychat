import yup from 'yup'
import { themes } from '../../utils/enums.js'
const editChatSetting = yup.object({
    theme:yup.string().oneOf(themes). required()
})

export default editChatSetting