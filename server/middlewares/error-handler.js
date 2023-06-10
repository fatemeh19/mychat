const { StatusCodes } = require("http-status-codes");
const {CustomError} = require('../errors') 
const ValidationError = require('../errors/ValidationError')
const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err)

  let Error = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong please try later",
  };
  // let Error
  if(err instanceof CustomError){
    Error = {
      name:err.type,
      statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
      msg: err.message || "Something went wrong please try later",
      field:err.field
    };
    
  }

  if(err instanceof ValidationError){
    Error = {
      statusCode:err.statusCode,
      errors:err.errors
    }
    
    
  }

  
  
 
 
  // if (err.name === 'ValidationError') {
  //   // for (let index = 0; index < array.length; index++) {
  //   // }
  //   console.log(err.inner[0].errors[0])
    
  //   // customError.msg = Object.values(err.errors)
  //   //   .map((item) =>item.path+':'+item.message)
  //   //   .join(',');
  //   // customError.statusCode = 400;
  // }

  return res.status(Error.statusCode).json({Error:Error});
};

module.exports = errorHandlerMiddleware
