const mongoose = require("mongoose");

const tradestat = new mongoose.Schema({
  userId: { type: String, trim: true, required: true },
  yearlyTradesTotal: { type: Number },
  yearlyTotalProfit: { type: Number },
  year: { type: Number },
  monthlyData: [
    {
      month: String,
      totalTrades: Number,
      totalProfit: Number,
    },
  ],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("tradestat", tradestat);
