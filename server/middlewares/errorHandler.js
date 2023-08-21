import { StatusCodes } from "http-status-codes";
import { CustomError,ValidationError } from "../errors/index.js";
import MessageCreator from "../utils/MessageCreator.js";
export default async (error, req, res, next) => {
    const {field,errorTypeDetail,statusCode}=error
    // if (errorClass == ValidationError) {
    //     errors = await errorExtractor(err);
    //   } else if (Field) {
    //     const message = await MessageCreator(Field.value, errorType.message);
    //     error = {
    //       errorType: errorType.name,
    //       field: Field.name,
    //       message,
    //     };
    //     errors.push(error);
    //   } else {
    //     error = {
    //       errorType: errorType?.name,
    //       message: errorType?.message,
    //     };
    //     errors.push(error);
    //   }



    let Error 
    if(error instanceof CustomError){
        Error = {
            field:field?.name,
            errorType:errorTypeDetail.name,
            message:await MessageCreator(field?.value, errorTypeDetail.message)

        }
        // it will have field , detail , statusCode
        // bad request
        // Unauthenticated
        // not Found
        // Unauthorized
    }else if( err instanceof ValidationError){
        //  it will have array of errors
        // validation 
    }else{
        // it will be a unhandeled error
    }
    res.status(statusCode).json({Error})
};
