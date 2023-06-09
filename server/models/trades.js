const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const trades = new Schema({
  userId: { type: String, trim: true, required: true, unique: false },
  stockId: { type: String, trim: true, required: true, unique: false },
  symbol: { type: String, trum: true, required: true, unique: false },
  lastsale: { type: String, trim: true, required: true },
  stockName: { type: String, trim: true, required: true },
  direction: { type: String, trim: true, required: true },
  price: { type: String, required: true },
  date: { type: Date, required: true },
  isClosed: { type: String, required: true },
  quantity: { type: Number, required: true },
  country: { type: String, require: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("trades", trades);
