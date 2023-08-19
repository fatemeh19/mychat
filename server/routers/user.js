import express from 'express';
const router = express.Router()


import uploadFile from "../utils/multer.js";

import {
  setInfo,
  getProfile,
  editProfile,
  getUser,
  blockUnblock
} from "../controllers/userController.js";

router.patch("/setInfo", uploadFile.single("profilePic"), setInfo);
router.route('/profile').get(getProfile).patch(editProfile)
router.patch("/block",blockUnblock)
export default router
