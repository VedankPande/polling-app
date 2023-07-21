import express from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import cors from "cors"

//local imports
import connect from "./config/database.js"
import pollsRouter from "./routes/pollRouter.js"

dotenv.config()
connect()

const app = express()

//middleware
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(bodyParser.urlencoded({
    extended: true
  }));

app.use(bodyParser.json());

app.use('/polls', pollsRouter)


app.listen(process.env.PORT,()=>{
  console.log(`Polls microservice listening on http://localhost:${process.env.PORT}`)
})