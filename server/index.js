import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import tradeRoutes from "./routes/trade.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import historyRoutes from "./routes/history.js";

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

app.use("/trade", tradeRoutes); //Investments Held, Investment List, Trades(Transactions), Geography
app.use("/general", generalRoutes); //Users and Dashboard
app.use("/history", historyRoutes); //Historical Transactions/ Daily/Monthly/Breakdown
app.use("/management", managementRoutes); //Management Admin
