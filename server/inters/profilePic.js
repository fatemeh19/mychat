import * as RH from "../middlewares/ResponseHandler.js";

import { StatusCodes } from "http-status-codes";
import { updateProfilePic } from "../controllers/profilePicController.js";
const updateProfilePicRoute = async (req, res) => {
  const {
    params: { id },
    file,
  } = req;
  await updateProfilePic(id, file);
  RH.SendResponse({ res, statusCode: StatusCodes.OK, title: "ok" });
};

export { updateProfilePicRoute };
