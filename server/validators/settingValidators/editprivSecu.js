import yup from 'yup'
import {privacy} from '../../utils/enums.js'
const editprivSecu = yup.object({
    security:yup.object({
        blockedUsers:yup.array(). required()
    }),
    privacy:yup.object({
        phoneNumber:yup.string().oneOf(privacy). required(),
        lastSeen:yup.string().oneOf(privacy). required(),
        profilePhotos:yup.string().oneOf(privacy). required(),
        addToGroup:yup.string().oneOf(privacy). required(),
        forwardedMessages:yup.string().oneOf(privacy). required(),
    })
})

export default editprivSecu

