import express from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser"

//local imports
import connect from "./config/database.js"
import pollsRouter from "./routes/pollRouter.js"

dotenv.config()
connect()

console.log("DOCKER CHANGE  BUILD")
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