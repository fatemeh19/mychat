import express from 'express'
const router = express.Router()
import groupRouter from "./group.js"
import uploadFile from "../utils/multer.js"
import {muteUnmuteNotificationsI,deleteChatI,addToChatsI,pinUnpinChatI,createChatI,getChatI,getChatsI} from '../inters/chat.js'
router.use('/group', groupRouter)
router.route('/').post(uploadFile.single('profilePic'),createChatI).get(getChatsI)
router.route('/:id').get(getChatI)
router.patch("/pinUnpin/:id",pinUnpinChatI)
router.patch("/addToChats/:id",addToChatsI)
// router.get('/search/:search',searchChatI)
router.delete('/:id',deleteChatI)
router.patch('/muteUnmuteNotif/:id',muteUnmuteNotificationsI)

export default router