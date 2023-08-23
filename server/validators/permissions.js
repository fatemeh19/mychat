import yup from 'yup'

export default yup.object({
    sendMessage:yup.boolean(). required(),
    sendMedia:yup.object({
        all:yup.boolean(). required(),
        photo:yup.boolean(). required(),
        videoMessage:yup.boolean(). required(),
        voice:yup.boolean(). required(),
        music:yup.boolean(). required(),
        file:yup.boolean(). required(),

    }),
    addMember:yup.boolean(). required(),
    pinMessages:yup.boolean(). required(),
    changeGroupInfo:yup.boolean(). required()
})