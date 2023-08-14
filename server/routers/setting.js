import express from "express";
const router = express.Router();

import uploadFile from "../utils/multer.js";

import { editSetting, getSetting } from "../controllers/settingController.js";

router.patch(
  "/:id/:title",
  uploadFile.fields([
    { name: "notifSound", maxCount: 1 },
    { name: "background", maxCount: 1 },
  ]),
  editSetting
);
router.get("/:id",getSetting);
export default router;
