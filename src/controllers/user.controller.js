const {
  saveUserInDB,
  getUserByEmailFromDB,
} = require("../services/user.service");

const createUser = async (req, res) => {
  try {
    const userInfo = req.body;
    if (await getUserByEmailFromDB(userInfo.email)) {
      return res.status(200).json({ message: "Welcome back to Food Point!" });
    }
    const user = await saveUserInDB(userInfo);

    return res.status(201).json({ user, message: "Welcome to Food Point!" });
  } catch (error) {
    return res.status(500).json({ message: "Error creating user" });
  }
};

const getUserInfo = async (req, res) => {
  try {
    const email = req.params.email;
    const user = await getUserByEmailFromDB(email);

    return res.status(200).json(user);
  } catch (error) {
    return res.status(404).json({ message: "User not found" });
  }
};

module.exports = { createUser, getUserInfo };
