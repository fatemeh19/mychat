import yup from 'yup'
import { groupType } from '../utils/enums.js'
const editGroupType = yup.object({
    groupType:yup.string().oneOf(groupType).required(),
    restrictSavingContent:yup.boolean().required(),
    url:yup.string().when('groupType',{
        is:'public',
        then: (createChat) => createChat.required()
    }),
    approveNewMembers:yup.boolean().when('groupType',{
        is:'public',
        then: (createChat) => createChat.required()
    }),
})

export default editGroupType