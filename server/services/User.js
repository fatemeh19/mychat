const User = require("../models/User");
const Fields = require("../messages/fields.json");
const ErrorMessages = require("../messages/errors.json");
const { RHCustomError } = require("../middlewares/ResponseHandler");
const mongooseErrorExtractor = require("../utils/mongooseErrorExtractor");
const CustomError = require("../errors");
const findUser = async (filter, select="") => {
  let user;
  try {
    user = await User.findOne(filter).select(select);
  } catch (err) {
    const { errorType, field } = await mongooseErrorExtractor(err);
    console.log(field)
      await RHCustomError({
        errorClass: CustomError.BadRequestError,
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
      errorClass: CustomError.BadRequestError,
      errorType,
      Field: Fields[field],
    });
  }

  return user;
};

const addNewContact = async (user, contact) => {
  User.findByIdAndUpdate({ _id: user._id }, { $push: { contacts: contact } });
};
const findUsers = async (Query, select = "", sort = "") => {
  const users = await User.find(Query).select(select).sort(sort);
  return users;
};

module.exports = {
  findUsers,
  findUser,
  createUser,
  findAndUpdateUser,
  addNewContact,
};
