const { paymentIntent } = require("../payment/paymentIntent");

const makePaymentIntent = async (req, res) => {
  try {
    const data = req.body;
    const intent = await paymentIntent(data.price);

    res.status(200).json({ clientSecret: intent.client_secret });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Something went wrong. Payment not successful!" });
  }
};

module.exports = { makePaymentIntent };
