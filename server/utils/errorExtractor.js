import ErrorMessageCreator from "./MessageCreator.js";
import ErrorMessages from "../messages/errors.js";
import Fields from "../messages/fields.js";
export default async (err) => {
  let validationErrors = [];
  let validationError;

  for (let i = 0; i < err.inner.length; i++) {
    for (let j = 0; j < err.inner[i].errors.length; j++) {
      if(err.inner[i].type==err.inner[i].path){
        continue
      }
      validationError = {
        name: err.inner[i].type,
        message: ErrorMessages[err.inner[i].type]
          ? await ErrorMessageCreator(
              Fields[err.inner[i].path]?.value,
              ErrorMessages[err.inner[i].type].message
            )
          : err.inner[i].errors[j],
        field: err.inner[i].path,
      };

      validationErrors.push(validationError);
    }
  }

  return validationErrors;
};
