import yup from 'yup'

const pinUnpinChat = yup.object({
    pin:yup.boolean().required('EmptyError'),
    allChats:yup.boolean().required('EmptyError'),
    folderId:yup.string().when("allChats",{
        is:false,
        then:(schema)=>schema.required('EmptyError')
    })
})

export default  loginUser