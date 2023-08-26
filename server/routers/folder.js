import express from 'express'
const router = express.Router()
import {editFolderI,getFoldersI,getFolderI,deleteFolderI,addRemoveChatI,createFolderI} from '../inters/folder.js' 

router.route('/')
      .get(getFoldersI)
      .post(createFolderI)
router.route('/:id')
       .delete(deleteFolderI)
       .get(getFolderI)   
       .put(editFolderI)  
router.patch('/addRemoveChat/:folderId',addRemoveChatI)

export default router      