import yup from 'yup'
import {privacy} from '../../utils/enums.js'
const editprivSecu = yup.object({
    security:yup.object({
        blockedUsers:yup.array().required('EmptyError')
    }),
    privacy:yup.object({
        phoneNumber:yup.string().oneOf(privacy).required('EmptyError'),
        lastSeen:yup.string().oneOf(privacy).required('EmptyError'),
        profilePhotos:yup.string().oneOf(privacy).required('EmptyError'),
        addToGroup:yup.string().oneOf(privacy).required('EmptyError'),
        forwardedMessages:yup.string().oneOf(privacy).required('EmptyError'),
    })
})

export default editprivSecu

