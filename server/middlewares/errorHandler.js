import { StatusCodes } from "http-status-codes";
import { CustomError } from "../errors/index.js";
import MessageCreator from "../utils/MessageCreator.js";
import errorExtractor from "../utils/errorExtractor.js";
import ValidationError from "../errors/ValidationError.js";
import errorCreator from "../utils/errorCreator.js";
export default async (error, req, res, next) => {
  
  const {Error,statusCode} = await errorCreator(error)
  res.status(statusCode).json({ Error });
};
