import express from "express";
const router = express.Router();
import {
  revokeLink,
  deleteInviteLink,
  editInviteLink,
  createInviteLink,
} from "../controllers/groupController.js";

router.patch("/:chatId", createInviteLink);
router.patch("/:chatId/:index", editInviteLink);
router.delete("/:chatId/:index", deleteInviteLink);
router.patch("/:chatId/:index", revokeLink);

export default router;
