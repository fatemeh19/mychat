import yup from 'yup'


// const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

// const setInfoV = yup.object({
//     name:yup.string().required('EmptyError'),
//     // phoneNumber:yup.string().matches(phoneRegExp,'FormatError').required('EmptyError')
// })

const setInfoV = yup.object({
    email:yup.string().email('FormatError').required('EmptyError'),
    password:yup.string().required('EmptyError')
})


export default  setInfoV