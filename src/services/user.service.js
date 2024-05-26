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

const saveCoinInDB = async (id, coin) => {
  return await UserSchema.findByIdAndUpdate(
    id,
    { $inc: { coins: Number(coin) } },
    { new: true }
  );
};

module.exports = {
  saveUserInDB,
  getUserByEmailFromDB,
  getTotalUserCountFromDB,
  saveCoinInDB,
};
