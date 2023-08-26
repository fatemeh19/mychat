import { StatusCodes } from "http-status-codes";
import * as RH from "../middlewares/ResponseHandler.js";
import messages from "../messages/messages.js";
import {
  setInfo,
  getProfile,
  editProfile,
  blockUnblock
} from "../controllers/userController.js";

const setInfoI = async (req, res, next) => {
  const {
    user: { userId },
    body,
    file,
  } = req;
  await setInfo(userId,body,file)
  

  res.locals.response = {
    statusCode : StatusCodes.OK,
    responseType:messages.ok
  }
  next()
};

const getProfileI = async (req, res, next) => {
  const {
    user: { userId },
  } = req;
  const profile = await getProfile(userId)


  res.locals.response = {
    statusCode : StatusCodes.OK,
    value: {
      profile
    },
    responseType:messages.ok
  }
   next()
};

const editProfileI = async (req, res, next) => {
  const {
    user: { userId },
    body,
  } = req;

  await editProfile(userId,body)
  
  res.locals.response = {
    statusCode : StatusCodes.OK,
    responseType:messages.ok
  }
  next()
};






const blockUnblockI = async (req, res, next) => {
  const {
    body,
    user: { userId },
  } = req;
  await blockUnblock(body,userId)
  
  res.locals.response = {
    statusCode : StatusCodes.OK,
    responseType:messages.ok
  }
  next()
};
export { blockUnblockI, setInfoI, getProfileI, editProfileI};
