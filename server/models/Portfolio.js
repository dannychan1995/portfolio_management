const mongoose = require("mongoose"),
      Schema = mongoose.Schema;

const PortSchema = new mongoose.Schema(
  {
    name: {type: String, required: true},
    description: String,
    cash: {type: Number, required: true, default: 0},
    value: {type: Number, required: true, default: 0},
    createDate: {type: Date, required: true, default: Date.now},
    transactions: [ { type: Schema.Types.ObjectId, ref: 'Transaction' } ],
    positions: [ { type: Schema.Types.ObjectId, ref: 'Position' } ]
  },
  { timestamps: true }
);



module.exports = mongoose.model("Portfolio", PortSchema);
