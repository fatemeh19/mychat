import express from "express";
const router = express.Router();

import uploadFile from "../utils/multer.js";

import { editSettingI, getSettingI, getBlockedUsersI } from "../inters/setting.js";

router.patch(
  "/:id",
  uploadFile.fields([
    { name: "notifSound", maxCount: 1 },
    { name: "background", maxCount: 1 },
  ]),
  editSettingI
);
router.get("/:id",getSettingI);

export default router;
