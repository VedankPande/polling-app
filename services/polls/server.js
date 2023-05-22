import express from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import mongoose from "mongoose"

//local imports

import connect from "../polls/config/database.js"
import pollSchema from "./model/polls.js"
import pollsRouter from "./routes/pollRouter.js"

dotenv.config()
connect()

const app = express()

//middleware
app.use(bodyParser.urlencoded({
    extended: true
  }));

app.use(bodyParser.json());

app.use('/polls', pollsRouter)


app.listen(process.env.PORT,()=>{
  console.log(`Polls microservice listening on http://localhost:${process.env.PORT}`)
})