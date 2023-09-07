import express from 'express';
const router = express.Router()


import uploadFile from "../utils/multer.js";

import {
  setInfoI,
  getProfileI,
  editProfileI,
  blockUnblockI
} from "../inters/user.js";
import { getBlockedUsersI } from '../inters/setting.js';

router.patch("/setInfo", uploadFile.single("profilePic"), setInfoI);
router.route('/profile').get(getProfileI).patch(editProfileI)
router.patch("/block",blockUnblockI)
router.get("/blockedUsers",getBlockedUsersI)
export default router
