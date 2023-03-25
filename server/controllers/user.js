"use strict";
let Models = require("../models"); //matches index.js

const getUser = (res) => {
  //finds all users
  Models.User.find({})
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => console.log(err.message));
};

const createUser = (data, res) => {
  //creates a new user using JSON data POSTed in request body
  console.log(data);
  new Models.User(data)
    .save()
    .then((data) => res.send({ result: 200, data: data }))
    .catch((err) => console.log(err.message));
};

module.exports = {
  getUser,
  createUser,
};
