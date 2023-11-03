const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userDetailsSchema = new Schema(
  {
    cardNumber: {
      type: String,
      required: true,
    },
    cardExpirationDate: {
      type: String,
      required: true,
    },
    cardCvv: {
      type: String,
      required: true,
    },
    cardName: {
      type: String,
      required: true,
    },
    plan: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserDetails", userDetailsSchema);
