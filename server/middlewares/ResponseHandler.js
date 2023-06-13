const MessageCreator = require("../utils/MessageCreator");
const ErrorMessages = require("../messages/errors.json");
const Fields = require("../messages/fields.json");
const Messages = require("../messages/messages.json");
const CustomError = require("../errors");

const errorExtractor = require("../utils/errorExtractor");

const RHCustomError = async ({ err, errorClass, errorType, Field }) => {
  let errors = [];
  let error;
  console.log(err);

  if (errorClass == CustomError.ValidationError) {
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
      errorType: errorType.name,
      message: errorType.message,
    };
    errors.push(error);
  }

  throw new errorClass("err.message", errors);
};

const RHSendResponse = async ({ res, statusCode, title, value, field }) => {
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
module.exports = { RHCustomError, RHSendResponse };
