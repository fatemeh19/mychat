import express from "express";
const router = express.Router();
import {
  joinGroupViaLink,
  revokeLink,
  deleteInviteLink,
  editInviteLink,
  createInviteLink,
  getGroupByLink
} from "../controllers/inviteLinkController.js";
router.get("/:link",getGroupByLink);
router.patch("/join/:link", joinGroupViaLink)
router.patch("/:chatId", createInviteLink);
router.patch("/:chatId/:index", editInviteLink);
router.delete("/:chatId/:index", deleteInviteLink);
router.patch("/revoke/:chatId/:index", revokeLink);

export default router;
