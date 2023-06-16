const yup = require('yup')
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

module.exports= yup.object({
    name:yup.string().required('EmptyError'),
    phoneNumber:yup.string().required('EmptyError')
})