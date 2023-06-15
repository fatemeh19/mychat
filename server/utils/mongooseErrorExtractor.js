const ErrorMessageCreator = require("./MessageCreator");
const ErrorMessages = require("../messages/errors.json");
const Fields = require("../messages/fields.json");
const CustomError = require("../errors");
module.exports = async (err) => {
  if (err.code == 11000) {
    return ErrorMessages.DuplicateError;
  }
};
