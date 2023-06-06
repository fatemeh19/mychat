const CustomError = require("../errors");

const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const { authorization: authHeader } = req.headers;
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new CustomError.UnauthenticatedError("no token provided");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    
    const { userId } = decoded;
    req.user = { userId };
    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError('Not authorized to access this route');

  }
};
module.exports = authMiddleware
