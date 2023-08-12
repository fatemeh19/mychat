import express from 'express';
const router = express.Router()


import uploadFile from "../utils/multer.js";

import {
  setInfo,
  getProfile,
  editProfile,
  getUser
} from "../controllers/userController.js";

// router.route('/:id').get(getUser)
router.patch("/setInfo", uploadFile.single("profilePic"), setInfo);
router.route('/profile').get(getProfile).patch(uploadFile.single("profilePic"),editProfile)

export default router
