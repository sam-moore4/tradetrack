const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

// parsse requests of content-type - application/json

app.use(express.json());

/* ROUTES */
// let tradingRoutes = require("./routes/trading");
let userRoutes = require("./routes/user");
// let statsRoutes = require("./routes/stats");
// let adminRoutes = require("./routes/admin");
// app.use("/trading", tradingRoutes); //Investments Held, Investment List, Trades(Transactions), Geography
app.use("/users", userRoutes); //Users and Dashboard
// app.use("/stats", statsRoutes); //Historical Transactions/ Daily/Monthly/Breakdown
// app.use("/admin", adminRoutes); //Management Admin

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
