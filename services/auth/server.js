//imports and config
import express from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import mongoose, { mongo } from "mongoose"

//local imports
import connect from "./config/database.js"
import auth from "./middleware/auth.js"
import authRouter from "./routes/authRouter.js"

//setup
dotenv.config()
connect()

const app = express()

//middleware
app.use(bodyParser.urlencoded({
    extended: true
  }));

app.use(bodyParser.json());

app.use('/', authRouter)

//driver
app.listen(process.env.PORT,() => {
    setTimeout(()=>{console.log(mongoose.connection.readyState)},5000)
    console.log(`Authentication microservice running on http://localhost:${process.env.PORT}`);
})
