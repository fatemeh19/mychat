import yup from 'yup'

const editNotifSound = yup.object({
    notifs:yup.boolean().required(),
})

export default editNotifSound