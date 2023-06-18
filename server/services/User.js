import User from "../models/User.js"
import Fields from "../messages/fields.js" 
import { RHCustomError } from "../middlewares/ResponseHandler.js"
import mongooseErrorExtractor from "../utils/mongooseErrorExtractor.js"
import {NotFoundError,UnauthorizedError,UnauthenticatedError,ValidationError,BadRequestError}  from "../errors/index.js";
const findUser = async (filter, select="") => {
  let user;
  try {
    user = await User.findOne(filter).select(select);
  } catch (err) {
    const { errorType, field } = await mongooseErrorExtractor(err);
    console.log(field)
      await RHCustomError({
        errorClass: BadRequestError,
        errorType,
        Field: Fields[field],
      });
    
  }

  return user;
};

const createUser = async (body) => {
  const user = await User.create(body);
  return user;
};

const findAndUpdateUser = async (id, updateQuery) => {
  let user;

  try {
    user = await User.findByIdAndUpdate(id, updateQuery);
  } catch (err) {
   
    const { errorType, field } = await mongooseErrorExtractor(err);
    return await RHCustomError({
      errorClass: BadRequestError,
      errorType,
      Field: Fields[field],
    });
  }

  return user;
};

// const addNewContact = async (user, contact) => {
//   User.findByIdAndUpdate({ _id: user._id }, { $push: { contacts: contact } });
// };
const findUsers = async (Query, select = "", sort = "") => {
  const users = await User.find(Query).select(select).sort(sort);
  return users;
};

export {

  findUsers,
  findUser,
  createUser,
  findAndUpdateUser,
  // addNewContact,
};
