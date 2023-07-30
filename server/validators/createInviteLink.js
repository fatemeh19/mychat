import yup from 'yup'

const createInviteLink = yup.object({
    name:yup.string(),
    expireDate:yup.object({
        noLimit:yup.boolean().required('EmptyError'),
        expiresIn:yup.date().when('noLimit',{
            is:false,
            then:(schema)=> schema.required('EmptyError')
        })
    }),
    limitForJoin:yup.object({
        noLimit:yup.boolean().required('EmptyError'),
        limit:yup.number().when('noLimit',{
            is:false,
            then:(schema)=> schema.required('EmptyError')
        })
    }),
    revoke:yup.boolean(),


})

export default createInviteLink