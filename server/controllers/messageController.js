import Message from "../models/message.js";
import * as Validators from "../validators/index.js";
import * as Services from "../services/index.js"
import * as RH from "../middlewares/ResponseHandler.js"
import * as CustomError from "../errors/index.js"
import ErrorMessages from "../messages/errors.js";
import messages from "../messages/messages.js";
import fields from "../messages/fields.js";
import { StatusCodes } from "http-status-codes";
const createMessage = async (req, res) => {
  const {
    params: { chatId },
    body: message,
    file
  } = req;
  
  const chat = await Services.Chat.getChat({_id:chatId})
  if(!chat){
    await RH.CustomError({
      errorClass: CustomError.BadRequestError,
      errorType: ErrorMessages.NotFoundError,
      Field: fields.chat,
    });
  }
  
  let newMessage = {
    content:{
        contentType:message.content.contentType,
        text:message.content.text
    },
    senderId:message.senderId
  }
  let data
  try {
    data = await Validators.createMessage.validate(newMessage,{
        stripUnknown:true,
        abortEarly:false
    })
  } catch (err) {
    await RH.CustomError({ err, errorClass: CustomError.ValidationError });
  }
  if(!file || !newMessage.content.contentType){
    // threw Error
    // console.log(file)
  }
  if(file && newMessage.content.contentType!='text'){
    data.url = path.join(process.cwd(), "../", file.path);
  }
  
  const messageId = await Services.Message.createMessage(data)
  res.send(messageId)

  

};

export{
    createMessage
}
