import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// dotenv.config({ path: path.resolve('../.env') }); -- this was giving issues when running server from root directory
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
import cors from 'cors';

// Allow all origins (for testing)
app.use(cors());

// OR, allow only your frontend origin:
app.use(cors({ origin: 'http://localhost:5173' }));
//var express = require("express");
//var app = express();
import app from "./express.js";
import assetsRouter from "./assets-router.js";
import router from "./routes/collections-router.js";
import welcomeMsgModel from "./models/welcome.model.js";

import { connect } from "mongoose";
//const assetsRouter = require("./server/assets-router");

//connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);
// mongoose.connect("mongodb+srv://ssandhu:samitsandhurocks@portfoliocluster.arcbjz6.mongodb.net/portfolio?retryWrites=true&w=majority&appName=portfolioCluster")
const connection = mongoose.connection;
connection.once("open", () => { console.log("MongoDB database connection established successfully"); });
connection.on("error", (error) => { console.error("MongoDB connection error:", error); });

//Back end routes
app.use("/src", assetsRouter);
app.use("/", router);
app.use(express.static(path.join(__dirname, '../client/dist'))); 


// catch-all for frontend routes, excluding API paths
app.get(/^(?!\/api).*$/, (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
  });
  

// Start the server
app.listen(3000);
console.log("Server running at http://localhost:3000/");
//module.exports = app;
export default app;