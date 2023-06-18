import express from 'express';
const router = express.Router()

import contactRouter from "./contact.js";

import uploadFile from "../utils/multer.js";

import {
  setInfo,
} from "../controllers/userController.js";
router.use("/contact", contactRouter);

router.patch("/setInfo", uploadFile.single("profilePic"), setInfo);
export default router
