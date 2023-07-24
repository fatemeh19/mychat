import express from "express";
const router = express.Router();
import { addMember, editGroupType, removeMember } from "../controllers/groupController.js";

router.post("/addMember/:groupId", addMember);
router.delete("/removeMember/:groupId", removeMember);
router.put("/editGroupType/:groupId", editGroupType);

export default router;
