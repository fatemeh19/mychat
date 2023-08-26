import MessageCreator from "../utils/MessageCreator.js";
import Messages from "../messages/messages.js";

export default async (req, res) => {
  const { statusCode, responseType, value, field } = res.locals.response;
  const response = {
    message: await MessageCreator(field?.value, responseType.message),
    value,
    field: field?.name,
  };

  res.status(statusCode).json(response);
};
