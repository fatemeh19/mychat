import yup from 'yup'
import { groupType } from '../utils/enums.js'
const editGroupType = yup.object({
    groupType:yup.string().oneOf(groupType,'EnumError').required('EmptyError'),
    restrictSavingContent:yup.boolean().required('EmptyError'),
    url:yup.string().when('groupType',{
        is:'public',
        then: (createChat) => createChat.required('EmptyError')
    }),
    approveNewMembers:yup.boolean().when('groupType',{
        is:'public',
        then: (createChat) => createChat.required('EmptyError')
    }),
})

export default editGroupType