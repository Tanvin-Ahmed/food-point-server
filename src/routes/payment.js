const express = require("express");
const { isAuthenticated } = require("../token/verification");
const { makePaymentIntent } = require("../controllers/payment");
const router = express.Router();

router.post("/create-payment-intent", isAuthenticated, makePaymentIntent);

module.exports = router;
