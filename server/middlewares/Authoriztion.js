import '../utils/loadEnv.js'
import {NotFoundError,UnauthorizedError,UnauthenticatedError,ValidationError,BadRequestError}  from "../errors/index.js";
import ErrorMessages from "../messages/errors.js"
import jwt from "jsonwebtoken";
import { RHCustomError } from "./ResponseHandler.js";
const authMiddleware = async (req, res, next) => {
  const { authorization: authHeader } = req.headers;
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    await RHCustomError({
      errorClass: UnauthenticatedError,
      errorType: ErrorMessages.NoTokenProvided,
    });
  }

  const token = authHeader.split(" ")[1];
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    
    const { userId } = decoded;
    req.user = { userId };
    next();
  } catch (err) {
    console.log(err)
    await RHCustomError({
      errorClass: UnauthenticatedError,
      errorType: ErrorMessages.UnauthorizedError,
    });

  }
};
export default  authMiddleware;
