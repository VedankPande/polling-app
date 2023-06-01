import express from "express"
import bodyParser from "body-parser"
import dotenv from "dotenv"

//Local imports
import votesRouter from "./routes/votesRouter.js"
import connectRabbitConsumer from "./config/messaging.js"
import connect from "./config/database.js"


//Setup and config
dotenv.config()
connect()
connectRabbitConsumer(process.env.RABBIT_URL,process.env.RABBIT_QUEUE)

const app = express()

//middleware
app.use(bodyParser.urlencoded({
    extended: true
  }));

app.use(bodyParser.json());

app.use('/votes',votesRouter)


app.listen(process.env.PORT,()=>{
    console.log(`Votes microservice listening on http://localhost:${process.env.PORT}`)
})