const {
  saveUserInDB,
  getUserByEmailFromDB,
} = require("../services/user.service");
const { tokenGenerator } = require("../token/generator");

const createUser = async (req, res) => {
  try {
    const userInfo = req.body;
    const existingUser = await getUserByEmailFromDB(userInfo.email);
    if (existingUser) {
      const token = tokenGenerator({
        email: existingUser.email,
        _id: existingUser._id,
      });
      return res
        .status(200)
        .json({ message: "Welcome back to Food Point!", token });
    }
    const user = await saveUserInDB(userInfo);

    const token = tokenGenerator({
      email: user.email,
      _id: user._id,
    });

    return res
      .status(201)
      .json({ userDetails, token, message: "Welcome to Food Point!" });
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
