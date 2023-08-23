import * as RH from "../middlewares/ResponseHandler.js";
import messages from "../messages/messages.js";

import { StatusCodes } from "http-status-codes";
import { updateProfilePic } from "../controllers/profilePicController.js";
const updateProfilePicRoute = async (req, res, next) => {
  const {
    params: { id },
    file,
  } = req;
  const profilePic = await updateProfilePic(id, file);
  
  res.locals.response = {
    statusCode : StatusCodes.OK,
    value:{
      profilePic
    },
    responseType:messages.ok
  }
  next()
};

export { updateProfilePicRoute };
