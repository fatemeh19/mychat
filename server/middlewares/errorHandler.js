import { StatusCodes } from "http-status-codes";
import { CustomError } from "../errors/index.js";
import MessageCreator from "../utils/MessageCreator.js";
import errorExtractor from "../utils/errorExtractor.js";
import ValidationError from "../errors/ValidationError.js";
export default async (error, req, res, next) => {
  let { field, errorTypeDetail, statusCode } = error;
  console.log("error:",error)
  let errors = [];
  let errorCategory = "Handeled";
  if (error instanceof CustomError) {
    
    errors.push({
      field: field?.name,
      errorType: errorTypeDetail.name,
      message: await MessageCreator(field?.value, errorTypeDetail.message),
    });

    // it will have field , detail , statusCode
    // bad request
    // Unauthenticated
    // not Found
    // Unauthorized
  } else if (error instanceof ValidationError) {

    //  it will have array of errors
    // validation

    errors = await errorExtractor(error.errors);
    error.errors = errors
  } else {
    errorCategory = "UnHandeled";
    // it will be a unhandeled error
    errors.push({name: error.name ,message: error.message  });
    statusCode = 500;
  }
  let Error = {
    errorCategory,
    errors,
  };
  res.status(statusCode).json({ Error });
};
