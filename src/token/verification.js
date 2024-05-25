const jwt = require("jsonwebtoken");
const { config } = require("../config/config");

module.exports.isAuthenticated = (req, res, next) => {
  try {
    const str = req.headers["authorization"];
    if (!str)
      return res.status(403).json({ message: "Unauthorized access denied!" });

    const token = str.split(" ")[1];
    const verified = jwt.verify(token, config.jwt_secret);

    if (!verified)
      return res.status(403).json({ message: "Unauthorized access denied!" });

    return next();
  } catch (error) {
    return res.status(403).json({ message: "Unauthorized access denied!" });
  }
};
