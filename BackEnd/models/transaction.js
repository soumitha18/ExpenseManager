const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const transactionSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      min: 3,
    },
    type: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: String,
      default: new Date().toLocaleString(),
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("UserTransaction", transactionSchema);
