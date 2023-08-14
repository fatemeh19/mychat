import express from "express";
const router = express.Router();
import uploadFile from "../utils/multer.js";
import bodyParser from "body-parser";
import {
  pinUnPinMessage,
  forwardMessage,
  createMessage,
  editMessage,
  searchMessage
} from "../controllers/messageController.js";
import permissionChecker from "../middlewares/permissionChecker.js";
import messageTypeChecker from "../middlewares/messageTypeChecker.js";

router
  .route("/:chatId")
  .post(
    [uploadFile.single("file")],
    createMessage
  )
  .patch(forwardMessage);

router.patch("/:pin/:chatId/:messageId", pinUnPinMessage);
router.put("/:id",uploadFile.single("file"),editMessage)
router.get("/search/:chatId/:search",searchMessage)
// router.patch("/seen/:chatId/:messageId",seenMessage)

// .delete(DeleteMessageHttp)
// ,uploadFile.single('file')]
export default router;
