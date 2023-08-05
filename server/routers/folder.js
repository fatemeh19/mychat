import express from 'express'
const router = express.Router()
import {getFolder,deleteFolder,removeFromFolder,addToFolder,createFolder} from '../controllers/folderController.js' 

router.route('/')
      .post(createFolder)
router.route('/:id')
       .delete(deleteFolder)
       .get(getFolder)     
router.patch('/addToFolder/:folderId/:chatId',addToFolder)
router.patch('/removeFromFolder/:folderId/:chatId',removeFromFolder)

export default router      