import express from "express";
const router = express.Router();
import {editGroupInfo, addMember, editGroupType, removeMember,editGroupPermissions } from "../controllers/groupController.js";
import permissionChecker from "../middlewares/permissionChecker.js";
import inviteLinkRouter from './inviteLink.js'
import uploadFile from '../utils/multer.js'
import { deleteChat,addToChats } from "../controllers/chatController.js";
router.use('/inviteLink',inviteLinkRouter)

router.post("/addMember/:chatId",permissionChecker('addMember'),addMember,addToChats);

router.delete("/removeMember/:chatId/:memberId", removeMember,deleteChat);
router.patch("/editGroupType/:chatId", editGroupType);
router.patch("/editGroupPermissions/:chatId",editGroupPermissions)
router.patch("/editGroupInfo/:chatId",uploadFile.single('profilePic'),editGroupInfo)
export default router;
