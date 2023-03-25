const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

// // parse requests of content-type - application/json

app.use(express.json());

//data imports
let options = require("./data/stocklist.js");
let stocks = require("./models/stocks.js");

/* ROUTES */

let userRoutes = require("./routes/user");
let stockRoutes = require("./routes/stocks");
app.use("/users", userRoutes); //Users
app.use("/stocks", stockRoutes); //Stock List

/* MONGOOSE SETUP */

const PORT = process.env.PORT || 9000;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
