import express from "express";
const router = express.Router();
import { addMember, editGroupType, removeMember,editGroupPermissions } from "../controllers/groupController.js";
import permissionChecker from "../middlewares/permissionChecker.js";
router.post("/addMember/:chatId",permissionChecker('addMember'),addMember);
router.delete("/removeMember/:chatId", removeMember);
router.put("/editGroupType/:chatId", editGroupType);
router.put("/editGroupPermissions/:chatId",editGroupPermissions)
export default router;
