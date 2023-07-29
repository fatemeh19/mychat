import express from "express";
const router = express.Router();
import {
  joinGroupViaLink,
  revokeLink,
  deleteInviteLink,
  editInviteLink,
  createInviteLink,
} from "../controllers/groupController.js";
router.patch("/join/:link", joinGroupViaLink)
router.patch("/:chatId", createInviteLink);
router.patch("/:chatId/:index", editInviteLink);
router.delete("/:chatId/:index", deleteInviteLink);
router.patch("/:chatId/:index", revokeLink);

export default router;
