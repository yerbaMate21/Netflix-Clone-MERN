const CreditCard = require("../models/creditCardModel");

const createCreditCard = async (req, res) => {
  const { number } = req.body;

  if (!number) {
    return res.status(400).json({ numberError: "Number is required" });
  }

  try {
    const user_id = req.user._id;
    const creditCard = await CreditCard.create({ number, user_id });
    res.status(200).json(creditCard);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createCreditCard };
