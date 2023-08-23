import { StatusCodes } from "http-status-codes";
import * as RH from "../middlewares/ResponseHandler.js";
import { register, verifyEmail, login } from "../controllers/authController.js";
import messages from "../messages/messages.js";
const registerI = async (req, res,next) => {
  const { body } = req;
  await register(body);

  res.locals.response = {
    statusCode : StatusCodes.OK,
    responseType:messages.confirm
  }
  next()

};

const verifyEmailI = async (req, res,next) => {
  const { email, verificationToken } = req.body;
  await verifyEmail(email, verificationToken);

  res.locals.response = {
    statusCode : StatusCodes.OK,
    responseType:messages.ok
  }
  next()
};

const loginI = async (req, res,next) => {
  const { token, isFirstTimeLogin } = await login(req.body);

  res.locals.response = {
    statusCode : StatusCodes.OK,
    value: {
      token,
      isFirstTimeLogin,
    },
    responseType:messages.successLogin
  }
  
  next()
};
export { registerI, verifyEmailI, loginI };
