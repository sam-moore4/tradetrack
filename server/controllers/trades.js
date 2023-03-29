"use strict";
let Models = require("../models"); //matches index.js

const getTrades = (res) => {
  //finds all users
  Models.Trades.find({})
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => console.log(err.message));
};

const createTrades = (data, res) => {
  //creates a new user using JSON data POSTed in request body
  console.log(data);
  new Models.Trades(data)
    .save()
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => console.log(err.message));
};

const updateTrades = (req, res) => {
  console.log(req.body);
  Models.Trades.findByIdAndUpdate(req.params.id, req.body, {
    useFindAndModify: false,
  })
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => {
      console.log(err);
      res.send({ result: 500, error: err.message });
    });
};

module.exports = {
  getTrades,
  createTrades,
  updateTrades,
};
