const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
  {
    symbol: {type: String, required: true},
    type: String,
    amount: {type: Number, required: true},
    price: {type: Number, required: true},
    createDate: {type: Date, required: true, default: Date.now},
  },
  { timestamps: true }
);



module.exports = mongoose.model("Transaction", TransactionSchema);
