import yup from 'yup'

const editNotifSound = yup.object({
    notifs:yup.boolean().required('EmptyError'),
})

export default editNotifSound