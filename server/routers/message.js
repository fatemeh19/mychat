import express from "express";
const router = express.Router();
import uploadFile from "../utils/multer.js";
import bodyParser from "body-parser";
import { createMessage } from "../controllers/messageController.js";
import permissionChecker from "../middlewares/permissionChecker.js";
import  messageTypeChecker  from "../middlewares/messageTypeChecker.js";

router
  .route("/:chatId")
  .post(
    [uploadFile.single("file"),messageTypeChecker, permissionChecker("")],
    createMessage
  );
// .delete(deleteMessage)
// ,uploadFile.single('file')]
export default router;
