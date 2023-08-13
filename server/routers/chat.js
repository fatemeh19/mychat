import express from 'express'
const router = express.Router()
import groupRouter from "./group.js"
import uploadFile from "../utils/multer.js"
import {addToChats,deleteChat,pinUnpinChat,createChat,getChat,getChats} from '../controllers/chatController.js'
import fileTypeIdentifier from '../utils/fileTypeIdentifier.js'
router.use('/group', groupRouter)
router.route('/').post(uploadFile.single('profilePic'),createChat).get(getChats)
router.route('/:id').get(getChat)
router.patch("/pinUnpin/:id",pinUnpinChat)
router.patch("/addToChats/:id",addToChats)



export default router