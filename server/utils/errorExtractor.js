const ErrorMessageCreator = require("./MessageCreator");
const ErrorMessages = require("../messages/errors.json");
const Fields = require("../messages/fields.json");
module.exports = async (err) => {
  let validationErrors = [];
  let validationError;
  console.log(err)
  for (let i = 0; i < err.inner.length; i++) {
    for (let j = 0; j < err.inner[i].errors.length; j++) {
      validationError = {
        name: "",
        message: "",
        field: "",
      };
      validationError.name = err.inner[i].errors[j];
      console.log(err.inner[i].path);
      validationError.message = await ErrorMessageCreator(
        Fields[err.inner[i].path].value,
        ErrorMessages[err.inner[i].errors[j]].message
      );
      validationError.field = err.inner[i].path;

      validationErrors.push(validationError);
      console.log(validationErrors);
    }
  }

  return validationErrors;
};
