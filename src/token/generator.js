const jwt = require("jsonwebtoken");
const { config } = require("../config/config");

module.exports.tokenGenerator = (data) => {
  return jwt.sign({ data }, config.jwt_secret, { expiresIn: "7d" });
};
