import '../utils/loadEnv.js'
import * as CustomError  from "../errors/index.js";
import ErrorMessages from "../messages/errors.js"
import jwt from "jsonwebtoken";
import * as RH from "./ResponseHandler.js";
const authMiddleware = async (req, res, next) => {
  const { authorization: authHeader } = req.headers;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new CustomError.UnauthenticatedError(ErrorMessages.NoTokenProvided,
    )
    
  }

  const token = authHeader.split(" ")[1];
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    
    const { userId } = decoded;
    req.user = { userId };
    next();
  } catch (err) {
    throw new CustomError.UnauthenticatedError(ErrorMessages.UnauthorizedError,
      )
   

  }
};
export default  authMiddleware;
