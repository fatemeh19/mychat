import yup from 'yup'

export default yup.object({
    sendMessage:yup.boolean().required('EmptyError'),
    sendMedia:yup.object({
        photos:yup.boolean().required('EmptyError'),
        videoFiles:yup.boolean().required('EmptyError'),
        videoMessages:yup.boolean().required('EmptyError'),
        music:yup.boolean().required('EmptyError'),
        file:yup.boolean().required('EmptyError'),
        stickers:yup.boolean().required('EmptyError'),
        embedLinks:yup.boolean().required('EmptyError'),
        polls:yup.boolean().required('EmptyError'),

    }),
    addMember:yup.boolean().required('EmptyError'),
    pinMessages:yup.boolean().required('EmptyError'),
    changeGroupInfo:yup.boolean().required('EmptyError')
})