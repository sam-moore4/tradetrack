const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const trades = new Schema({
  userId: { type: String, trim: true, required: true },
  stockId: { type: String, trim: true, required: true, unique: true },
  direction: { type: String, trim: true, required: true },
  price: { type: String, required: true },
  date: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("trades", trades);
