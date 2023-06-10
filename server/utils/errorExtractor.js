const ErrorMessageCreator = require("./ErrorMessageCreator");
const ErrorMessages = require("../messages/errors.json");
const ErrorFields = require("../messages/fields.json");
module.exports = async (err) => {
  let validationErrors = [];
  let validationError;
  for (let i = 0; i < err.inner.length; i++) {
    for (let j = 0; j < err.inner[i].errors.length; j++) {
      validationError = {
        name: "",
        message: "",
        field: "",
      };
      validationError.name = err.inner[i].errors[j];
      console.log(ErrorFields[err.inner[i].path].value);
      validationError.message = await ErrorMessageCreator(
        ErrorFields[err.inner[i].path].value,
        ErrorMessages[err.inner[i].errors[j]].message
      );
      validationError.field = err.inner[i].path;

      validationErrors.push(validationError);
      console.log(validationErrors);
    }
  }

  return validationErrors;
};
