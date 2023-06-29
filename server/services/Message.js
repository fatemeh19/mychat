import Message from "../models/message.js";
import Fields from "../messages/fields.js";
import * as RH from "../middlewares/ResponseHandler.js";
import mongooseErrorExtractor from "../utils/mongooseErrorExtractor.js";
import * as CustomError from "../errors/index.js";
const createMessage = async (message) => {
//   try {
    const newMessage = await Message.create(message);
    return newMessage;
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
const findMessage = async (query)=>{
    const message = await Message.findOne(query)
    return message

}
const deleteMessage = async (Query)=>{
    const indexs =await Message.deleteMany(Query)
    return indexs
  
  }
export { createMessage,findMessage,deleteMessage };
