import { StatusCodes } from "http-status-codes";
import * as RH from "../middlewares/ResponseHandler.js";
import {
  setInfo,
  getProfile,
  editProfile,
  blockUnblock
} from "../controllers/userController.js";

const setInfoI = async (req, res) => {
  const {
    user: { userId },
    body,
    file,
  } = req;
  await setInfo(userId,body,file)
  

  await RH.SendResponse({
    res,
    statusCode: StatusCodes.OK,
    title: "ok",
  });
};

const getProfileI = async (req, res) => {
  const {
    user: { userId },
  } = req;
  const profile = await getProfile(userId)


  await RH.SendResponse({
    res,
    statusCode: StatusCodes.OK,
    title: "ok",
    value: {
      profile
    },
  });
};

const editProfileI = async (req, res) => {
  const {
    user: { userId },
    body,
  } = req;

  await editProfile(userId,body)
  
  await RH.SendResponse({
    res,
    statusCode: StatusCodes.OK,
    title: "ok",
  });
};





const blockUnblockI = async (req, res) => {
  const {
    body,
    user: { userId },
  } = req;
  await blockUnblock(body,userId)
  
  RH.SendResponse({ res, statusCode: StatusCodes.OK, title: "ok" });
};
export { blockUnblockI, setInfoI, getProfileI, editProfileI};
