import express from "express";
const router = express.Router();
import {createInviteLink, getGroupByLink, addMember, editGroupType, removeMember,editGroupPermissions } from "../controllers/groupController.js";
import permissionChecker from "../middlewares/permissionChecker.js";
import inviteLinkRouter from './inviteLink.js'
router.use('/inviteLink',inviteLinkRouter)
router.post("/addMember/:chatId",permissionChecker('addMember'),addMember);
router.get("/:link",getGroupByLink);

router.delete("/removeMember/:chatId/:memberId", removeMember);
router.patch("/editGroupType/:chatId", editGroupType);
router.patch("/editGroupPermissions/:chatId",editGroupPermissions)
export default router;
