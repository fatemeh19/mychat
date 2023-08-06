import express from 'express'
const router = express.Router()
import {getFolders,getFolder,deleteFolder,addRemoveChat,createFolder} from '../controllers/folderController.js' 

router.route('/')
      .get(getFolders)
      .post(createFolder)
router.route('/:id')
       .delete(deleteFolder)
       .get(getFolder)     
router.patch('/addRemoveChat/:folderId/:chatId/:add',addRemoveChat)

export default router      