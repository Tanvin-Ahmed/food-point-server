const { config } = require("../config/config");
const stripe = require("stripe")(config.stripe_secret);

const calculateOrderAmount = (money) => {
  return Math.round(money * 100);
};

module.exports.paymentIntent = async (money) =>
  await stripe.paymentIntents.create({
    amount: calculateOrderAmount(Number(money)),
    currency: "usd",
    payment_method_types: ["card"],
  });
