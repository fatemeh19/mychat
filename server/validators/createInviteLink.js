import yup from 'yup'

const createInviteLink = yup.object({
    name:yup.string(),
    expireDate:yup.object({
        noLimit:yup.boolean(). required(),
        expiresIn:yup.date().when('noLimit',{
            is:false,
            then:(schema)=> schema. required()
        })
    }),
    limitForJoin:yup.object({
        noLimit:yup.boolean(). required(),
        limit:yup.number().when('noLimit',{
            is:false,
            then:(schema)=> schema. required()
        })
    }),
    revoke:yup.boolean(),


})

export default createInviteLink