const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const creditCardSchema = new Schema(
  {
    number: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timeseries: true }
);

module.exports = mongoose.model("CreditCard", creditCardSchema);
