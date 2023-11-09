const UserDetails = require("../models/userDetailsModel");
const mongoose = require("mongoose");

const createUserDetails = async (req, res) => {
  const { cardNumber, cardExpirationDate, cardCvv, cardName, plan } = req.body;

  if (!cardNumber || !cardExpirationDate || !cardCvv || !cardName || !plan) {
    return res.status(400).json({ error: "Please fill in all fields" });
  }

  if (!cardNumber) {
    return res
      .status(400)
      .json({ cardNumberError: "Please enter a card number." });
  }
  if (!cardExpirationDate) {
    return res
      .status(400)
      .json({ cardExpirationDateError: "Please enter an expiration date." });
  }
  if (!cardCvv) {
    return res.status(400).json({ cardCvvError: "Please enter a CVV." });
  }
  if (!cardName) {
    return res.status(400).json({ cardNameError: "Name is required." });
  }

  try {
    const user_id = req.user._id;
    const userDetails = await UserDetails.create({
      cardNumber,
      cardExpirationDate,
      cardCvv,
      cardName,
      plan,
      user_id,
    });
    res.status(200).json(userDetails);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserDetails = async (req, res) => {
  const user_id = req.user._id;

  const userDetails = await UserDetails.find({ user_id }).sort({
    createdAt: -1,
  });

  res.status(200).json(userDetails);
};

const updateUserDetails = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such user details" });
  }

  const userDetails = await UserDetails.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!userDetails) {
    return res.status(400).json({ error: "No such user details" });
  }

  res.status(200).json(userDetails);
};

module.exports = { createUserDetails, getUserDetails, updateUserDetails };
