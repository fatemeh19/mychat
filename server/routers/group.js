import express from "express";
const router = express.Router();
import {editGroupInfo,getGroupByLink, addMember, editGroupType, removeMember,editGroupPermissions } from "../controllers/groupController.js";
import permissionChecker from "../middlewares/permissionChecker.js";
import inviteLinkRouter from './inviteLink.js'
import uploadFile from '../utils/multer.js'
router.use('/inviteLink',inviteLinkRouter)

router.post("/addMember/:chatId",permissionChecker('addMember'),addMember);
router.get("/:link",getGroupByLink);

router.delete("/removeMember/:chatId/:memberId", removeMember);
router.patch("/editGroupType/:chatId", editGroupType);
router.patch("/editGroupPermissions/:chatId",editGroupPermissions)
router.patch("/editGroupInfo/:chatId",uploadFile.single('profilePic'),editGroupInfo)
export default router;
