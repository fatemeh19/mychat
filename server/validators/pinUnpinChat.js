import yup from 'yup'

const pinUnpinChat = yup.object({
    pin:yup.boolean(). required(),
    allChats:yup.boolean(). required(),
    folderId:yup.string().when("allChats",{
        is:false,
        then:(schema)=>schema. required()
    })
})

export default  pinUnpinChat