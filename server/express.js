import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import mongoose from 'mongoose'
// import dotenv from 'dotenv/config.js'
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors())

//connect to MongoDB
// mongoose.connect(process.env.MONGODB_URI);
// const connection = mongoose.connection;
// connection.once("open", () => { console.log("MongoDB database connection established successfully"); });
// connection.on("error", (error) => { console.error("MongoDB connection error:", error); });

export default app