import express from "express";
const router = express.Router();
import uploadFile from "../utils/multer.js";
import bodyParser from "body-parser";
import {
  pinUnPinMessageI,
  forwardMessageI,
  createMessageI,
  editMessageI,
  
} from "../inters/message.js";
import permissionChecker from "../middlewares/permissionChecker.js";
import messageTypeChecker from "../middlewares/messageTypeChecker.js";

router
  .route("/:chatId")
  .post(
    [uploadFile.single("file")],
    createMessageI
  )
  .patch(forwardMessageI);

router.patch("/:pin/:chatId/:messageId", pinUnPinMessageI);
router.put("/:id",uploadFile.single("file"),editMessageI)
// router.get("/search/:chatId/:search",searchMessageI)
// router.patch("/seen/:chatId/:messageId",seenMessage)

// .delete(DeleteMessageHttp)
// ,uploadFile.single('file')]
export default router;
