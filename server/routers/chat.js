import express from 'express'
const router = express.Router()
import groupRouter from "./group.js"
import uploadFile from "../utils/multer.js"
import {searchChat,addToChats,deleteChat,pinUnpinChat,createChat,getChat,getChats} from '../controllers/chatController.js'
router.use('/group', groupRouter)
router.route('/').post(uploadFile.single('profilePic'),createChat).get(getChats)
router.route('/:id').get(getChat)
router.patch("/pinUnpin/:id",pinUnpinChat)
router.patch("/addToChats/:id",addToChats)
router.get('/search/:search',searchChat)



export default router