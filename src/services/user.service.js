const { UserSchema } = require("../models/user.model");

const saveUserInDB = async (info) => {
  return await UserSchema.create(info);
};

const getUserByEmailFromDB = async (email) => {
  return await UserSchema.findOne({ email });
};

const getTotalUserCountFromDB = async () => {
  return await UserSchema.countDocuments({});
};

module.exports = {
  saveUserInDB,
  getUserByEmailFromDB,
  getTotalUserCountFromDB,
};
