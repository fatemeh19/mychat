import { StatusCodes } from "http-status-codes";
import * as RH from "../middlewares/ResponseHandler.js";
import { register, verifyEmail, login } from "../controllers/authController.js";

const registerI = async (req, res) => {
  const { body } = req;
  await register(body);

  return RH.SendResponse({ res, statusCode: StatusCodes.OK, title: "confirm" });
};

const verifyEmailI = async (req, res) => {
  const { email, verificationToken } = req.body;
  await verifyEmail(email, verificationToken);

  return RH.SendResponse({
    res,
    statusCode: StatusCodes.OK,
    title: "confirmed",
  });
};

const loginI = async (req, res) => {
  const { token, isFirstTimeLogin } = await login(req.body);

  return RH.SendResponse({
    res,
    statusCode: StatusCodes.OK,
    title: "successLogin",
    value: {
      token,
      isFirstTimeLogin,
    },
  });
};
export { registerI, verifyEmailI, loginI };
