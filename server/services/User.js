import User from "../models/User.js";
import Fields from "../messages/fields.js";
import * as RH from "../middlewares/ResponseHandler.js";
import mongooseErrorExtractor from "../utils/mongooseErrorExtractor.js";
import * as CustomError from "../errors/index.js";
const findUser = async (filter, select = {}) => {
  let user;
  try {
    user = await User.findOne(filter).select(select);
  } catch (err) {
    const { errorType, field } = await mongooseErrorExtractor(err);
    console.log(field);
    await RH.CustomError({
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

const findAndUpdateUser = async (id, updateQuery,options) => {
  let user;

  try {
    user = await User.findByIdAndUpdate(id, updateQuery, options).select({password:0});
  } catch (err) {
    console.log(err)
    const { errorType, field } = await mongooseErrorExtractor(err);

    return await RH.CustomError({
      errorClass: CustomError.BadRequestError,
      errorType,
      Field: Fields[field],
    });
  }

  return user;
};

const findUsers = async (Query, select = {}, sort = "") => {
  const users = await User.find(Query).select(select).sort(sort);
  return users;
};

const findAndUpdateBySave = async (findQuery, data) => {
  let user;
  try {
    user = await User.findOne(findQuery);
    user.set(data);
    user = await user.save();
  } catch (err) {
    const { errorType, field } = await mongooseErrorExtractor(err);

    return await RH.CustomError({
      errorClass: CustomError.BadRequestError,
      errorType,
      Field: Fields[field],
      
    });
  }
  return user
};

const aggregateUsers = async (pipeLine)=>{
  const result = await User.aggregate(pipeLine)
  return result

}

const updateUsers = async (Query,update)=>{
  const updated = await User.updateMany(Query,update)
  return updated
}

export {
  findUsers,
  findUser,
  createUser,
  findAndUpdateUser,
  findAndUpdateBySave,
  aggregateUsers,
  updateUsers
};
