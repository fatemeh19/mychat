import Message from "../models/message.js";
import Fields from "../messages/fields.js";
import * as RH from "../middlewares/ResponseHandler.js";
import mongooseErrorExtractor from "../utils/mongooseErrorExtractor.js";
import * as CustomError from "../errors/index.js";
const createMessage = async (message) => {
//   try {
    const newMessage = await Message.create(message);
    return newMessage._id;
//   } catch (err) {
    // console.log(err.errors)
    // console.log("errName=",err.errors)
    // const { errorType, field } = await mongooseErrorExtractor(err);
    // return await RH.CustomError({
    //     errorClass: CustomError.BadRequestError,
    //     errorType,
    //     Field: Fields[field],
        
    //   });
//   }

 

  
};

export { createMessage };
