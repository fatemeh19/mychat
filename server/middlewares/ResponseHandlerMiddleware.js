const ErrorMessageCreator = require("../utils/ErrorMessageCreator");
const ErrorMessages = require("../messages/errors.json");
const ErrorFields = require("../messages/fields.json");
const Messages = require("../messages/messages.json");
const CustomError = require("../errors");

const errorExtractor = require("../utils/errorExtractor");

const RHCustomError = async (errorClass, errorType, Field) => {
  
  
  const message = await ErrorMessageCreator(Field.value, errorType.message);

  throw new errorClass(message, errorType.name, Field.name);
};

const RHValidationError = async (err) => {
  let validationErrors = await errorExtractor(err);

  throw new CustomError.ValidationError(err.message, validationErrors);
};
const RHSendResponse = async (res, statusCode, part, title,value) => {
  
  let response = {
    msg: Messages[part][title],
    value
  };
  // if (value) {
  //   response.value = value;
  // }
  res.status(statusCode).json(response);
};
module.exports = { RHCustomError, RHValidationError, RHSendResponse };
