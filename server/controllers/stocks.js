"use strict";
let Models = require("../models"); //matches index.js

const getStock = (res) => {
  Models.Stocks.find({})
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => console.log(err.message));
};

const createStock = (data, res) => {
  console.log(data);
  new Models.Stocks(data)
    .save()
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => console.log(err.message));
};

module.exports = {
  getStock,
  createStock,
};
