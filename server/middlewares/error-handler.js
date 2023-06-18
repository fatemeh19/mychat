import { StatusCodes } from "http-status-codes";
import {CustomError} from '../errors/index.js'
// const { CustomError } from "../errors");
import ValidationError from "../errors/ValidationError.js"
const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);

  let Error;
  if (err instanceof CustomError) {
    
    Error = {
      statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
      errors: err.errors,
    };
  } else {
    let errors = [];
    let error = {
      msg: err.message || "Something went wrong please try later",
    };
    errors.push(error)
    Error ={
      statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
      errors 
    }
  }


  return res.status(Error.statusCode).json({ Error: Error });
};

export default errorHandlerMiddleware
