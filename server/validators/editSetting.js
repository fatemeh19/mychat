import yup from 'yup'
import { editSettingOptions } from '../utils/enums.js'
const editSetting = yup.object({
    title: yup.string().oneOf(editSettingOptions).required(), 
})

export default editSetting