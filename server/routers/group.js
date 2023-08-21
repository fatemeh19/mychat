import express from "express";
const router = express.Router();
import {getMembersI,editGroupInfoI, addMemberI, editGroupTypeI, removeMemberI,editGroupPermissionsI } from "../inters/group.js";
import permissionChecker from "../middlewares/permissionChecker.js";
import inviteLinkRouter from './inviteLink.js'
import uploadFile from '../utils/multer.js'
import { deleteChatI,addToChatsI } from "../inters/chat.js";
router.use('/inviteLink',inviteLinkRouter)

router.post("/addMember/:chatId",permissionChecker('addMember'),addMemberI,addToChatsI);

router.delete("/removeMember/:chatId/:memberId", removeMemberI,deleteChatI);
router.get("/getMembers/:id",getMembersI);
router.patch("/editGroupType/:chatId", editGroupTypeI);
router.patch("/editGroupPermissions/:chatId",editGroupPermissionsI)
router.patch("/editGroupInfo/:chatId",editGroupInfoI)
export default router;
