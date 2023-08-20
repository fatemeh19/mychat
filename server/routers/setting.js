import express from "express";
const router = express.Router();

import uploadFile from "../utils/multer.js";

import { editSettingI, getSettingI } from "../inters/setting.js";

router.patch(
  "/:id/:title",
  uploadFile.fields([
    { name: "notifSound", maxCount: 1 },
    { name: "background", maxCount: 1 },
  ]),
  editSettingI
);
router.get("/:id",getSettingI);
export default router;
