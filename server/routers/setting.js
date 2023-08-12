import express from 'express';
const router = express.Router()


import uploadFile from "../utils/multer.js";

import {
  editSetting
} from "../controllers/settingController.js";

router.patch("/:id/:title",uploadFile.fields([{ name: 'notifSound', maxCount: 1 }, { name: 'background', maxCount: 8 }]),editSetting)
export default router
