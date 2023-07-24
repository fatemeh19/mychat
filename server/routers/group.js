import express from "express";
const router = express.Router();
import { addMember, editGroupType, removeMember,editGroupPermissions } from "../controllers/groupController.js";

router.post("/addMember/:groupId", addMember);
router.delete("/removeMember/:groupId", removeMember);
router.put("/editGroupType/:groupId", editGroupType);
router.put("/editGroupPermissions/:groupId",editGroupPermissions)
export default router;
