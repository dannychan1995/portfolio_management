const mongoose = require("mongoose");

const PositionSchema = new mongoose.Schema(
  {
    symbol: {type: String, required: true},
    type: String,
    amount: {type: Number, required: true},
    lastPrice: {type: Number, required: true},
    createDate: {type: Date, required: true, default: Date.now},
  },
  { timestamps: true }
);



module.exports = mongoose.model("Position", PositionSchema);
