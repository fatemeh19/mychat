import yup from 'yup'
import {privacy} from '../../utils/enums.js'
const editprivSecu = yup.object({
    security:yup.object({
        blockedUsers:yup.array()
    }),
    privacy:yup.object({
        phoneNumber:yup.string().oneOf(privacy). required(),
        lastseen:yup.string().oneOf(privacy). required(),
        profilePic:yup.string().oneOf(privacy). required(),
        addToGroup:yup.string().oneOf(privacy). required(),
    })
})

export default editprivSecu

