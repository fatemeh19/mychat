import express from "express";
const router = express.Router();
import { addMember, editGroupType } from "../controllers/groupController.js";

router.patch("/addMember/:groupId", addMember);
router.patch("/editGroupType/:groupId", editGroupType);

export default router;
