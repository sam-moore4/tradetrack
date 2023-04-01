const mongoose = require("mongoose");

const stocks = new mongoose.Schema({
  Symbol: {
    type: String,
  },
  Name: {
    type: String,
    required: true,
  },
  Type: {
    type: String,
  },
  StockEx: {
    type: String,
  },
  "Last Sale": {
    type: String,
    required: true,
  },
  "Net Change": {
    type: Number,
  },
  "% Change": {
    type: String,
  },
  "Market Cap": {
    type: Number,
  },
  Country: {
    type: String,
  },
  "IPO Year": {
    type: Number,
  },
  Volume: {
    type: Number,
  },
  Sector: {
    type: String,
  },
  Industry: {
    type: String,
  },
});

module.exports = mongoose.model("stocks", stocks);
