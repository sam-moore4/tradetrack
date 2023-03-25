import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import tradingRoutes from "./routes/trading";
import generalRoutes from "./routes/general";
import adminRoutes from "./routes/admin";
import statsRoutes from "./routes/stats";

//data imports

import User from "./models/User.js";
import { dataUser } from "./data/index.js";

/* CONFIGURATION */
dotenv.config(); //set up environment variables
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */

app.use("/trading", tradingRoutes); //Investments Held, Investment List, Trades(Transactions), Geography
app.use("/general", generalRoutes); //Users and Dashboard
app.use("/stats", statsRoutes); //Historical Transactions/ Daily/Monthly/Breakdown
app.use("/admin", adminRoutes); //Management Admin

/* MONGOOSE SETUP */

const PORT = process.env.PORT || 9000;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    User.insertMany(dataUser);
  })
  .catch((error) => console.log(`${error} did not connect`));
