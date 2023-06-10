// import * as yup from 'yup'
const yup = require('yup')

const registerUser = yup.object({
    email:yup.string().email('FormatError').required('EmptyError'),
    password:yup.string().required('EmptyError')
})

module.exports = registerUser