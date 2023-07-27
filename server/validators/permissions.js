import yup from 'yup'

export default yup.object({
    sendMessage:yup.boolean().required('EmptyError'),
    sendMedia:yup.object({
        photo:yup.boolean().required('EmptyError'),
        videoMessage:yup.boolean().required('EmptyError'),
        voice:yup.boolean().required('EmptyError'),
        music:yup.boolean().required('EmptyError'),
        file:yup.boolean().required('EmptyError'),

    }),
    addMember:yup.boolean().required('EmptyError'),
    pinMessages:yup.boolean().required('EmptyError'),
    changeGroupInfo:yup.boolean().required('EmptyError')
})