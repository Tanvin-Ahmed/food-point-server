const { UserSchema } = require("../models/user.mode");

const saveUserInDB = async (info) => {
  return await UserSchema.create(info);
};

const getUserByEmailFromDB = async (email) => {
  return await UserSchema.findOne({ email });
};

module.exports = { saveUserInDB, getUserByEmailFromDB };
