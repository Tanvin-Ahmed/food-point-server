const express = require("express");
const { createUser, getUserInfo } = require("../controllers/user.controller");
const router = express.Router();

router.post("/create", createUser);
router.get("/get/:email", getUserInfo);

module.exports = router;
