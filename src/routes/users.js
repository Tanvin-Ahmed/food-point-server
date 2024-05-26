const express = require("express");
const {
  createUser,
  getUserInfo,
  refreshToken,
  getUserCount,
  updateCoin,
} = require("../controllers/user.controller");
const { isAuthenticated } = require("../token/verification");
const router = express.Router();

router.post("/refresh-token", isAuthenticated, refreshToken);
router.post("/create", createUser);
router.get("/get/:email", getUserInfo);
router.get("/count", getUserCount);
router.put("/update-coin-after-payment", isAuthenticated, updateCoin);
module.exports = router;
