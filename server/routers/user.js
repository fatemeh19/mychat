import express from 'express';
const router = express.Router()


import uploadFile from "../utils/multer.js";

import {
  setInfo,
  getProfile
} from "../controllers/userController.js";


router.patch("/setInfo", uploadFile.single("profilePic"), setInfo);
router.get('/profile',getProfile)
export default router
