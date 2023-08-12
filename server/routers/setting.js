import express from 'express';
const router = express.Router()


import uploadFile from "../utils/multer.js";

import {
  editSetting
} from "../controllers/settingController.js";

router.patch("/:title",uploadFile.single('notifSound'),editSetting)
export default router
