import ErrorMessageCreator from "./MessageCreator.js"
import ErrorMessages from "../messages/errors.js"
import Fields from "../messages/fields.js" 
export default  async (err) => {
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
