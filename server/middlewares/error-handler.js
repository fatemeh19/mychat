const { StatusCodes } = require("http-status-codes");
const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong please try later",
  };
  
  console.log(err._message)
 
  if (err.name === 'ValidationError') {
    customError.msg = Object.values(err.errors)
      .map((item) =>item.path+':'+item.message)
      .join(',');
    customError.statusCode = 400;
  }
  
  return res.status(customError.statusCode).json({msg:customError.msg});
};

module.exports = errorHandlerMiddleware
