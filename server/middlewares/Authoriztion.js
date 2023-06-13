const CustomError = require("../errors");
const ErrorMessages = require("../messages/errors.json");
const jwt = require("jsonwebtoken");
const { RHCustomError } = require("./ResponseHandler");
const authMiddleware = async (req, res, next) => {
  const { authorization: authHeader } = req.headers;
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    await RHCustomError({
      errorClass: CustomError.UnauthenticatedError,
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
      errorClass: CustomError.UnauthenticatedError,
      errorType: ErrorMessages.UnauthorizedError,
    });

  }
};
module.exports = authMiddleware;
