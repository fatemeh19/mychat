import BadRequestError from "../errors/BadRequest.js";
import ErrorMessages from "../messages/errors.js";
export default async (err) => {
  let field;
  let errorType;

  if (err.code == 11000) {
    for (var key in err.keyPattern) {
      field = key;
    }

    errorType = ErrorMessages.DuplicateError;
  }
  if (err.name == "CastError") {
    field = err.path;

    errorType = ErrorMessages.FormatError;
  }
  if(err instanceof BadRequestError){
    field = err.field.name
    errorType = err.errorTypeDetail
  }
  if (!errorType) {
    errorType = err.message;
  }
  return { errorType, field };
};
