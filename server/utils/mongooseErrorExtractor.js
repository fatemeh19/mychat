const ErrorMessageCreator = require("./MessageCreator");
const ErrorMessages = require("../messages/errors.json");
const Fields = require("../messages/fields.json");
const CustomError = require("../errors");
module.exports = async (err) => {
  let field
  let errorType
  if (err.code == 11000) {
    for (var key in err.keyPattern) {
      field = key;
    }

    errorType = ErrorMessages.DuplicateError
    
  }
  if (err.name == "CastError") {
    field = err.path;
    
    errorType = ErrorMessages.FormatError;
   
  }
  return { errorType, field };
};
