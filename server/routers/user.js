import express from 'express';
const router = express.Router()


import uploadFile from "../utils/multer.js";

import {
  setInfo,
  
} from "../controllers/userController.js";


router.patch("/setInfo", uploadFile.single("profilePic"), setInfo);
export default router
