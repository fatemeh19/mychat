import MessageCreator from "../utils/MessageCreator.js";
import Messages from "../messages/messages.js";
import { ValidationError } from "../errors/index.js";
import errorExtractor from "../utils/errorExtractor.js";

const CustomError = async ({ err, errorClass, errorType, Field, socket = false }) => {
  let errors = [];
  let error;
  console.log(err);

  if (errorClass == ValidationError) {
    errors = await errorExtractor(err);
  } else if (Field) {
    const message = await MessageCreator(Field.value, errorType.message);
    error = {
      errorType: errorType.name,
      field: Field.name,
      message,
    };
    errors.push(error);
  } else {
    error = {
      errorType: errorType?.name,
      message: errorType?.message,
    };
    errors.push(error);
  }
  throw new errorClass("error message : ", errors);
  
  
};

const SendResponse = async ({ res, statusCode, title, value, field }) => {
  let response;
  if (field) {
    response = {
      message: await MessageCreator(field.value, Messages[title]),
      value,
    };
  } else {
    response = {
      message: Messages[title],
      value,
    };
  }
  res.status(statusCode).json(response);
};
export { CustomError, SendResponse };
