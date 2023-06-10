const User = require("../models/User");

const findUser = async (filter) => {
                                          
  const user = await User.findOne(filter)
  return user
};

const createUser = async (body)=>{
  const user = await User.create(body)
  return user
}

module.exports = {findUser, createUser}
