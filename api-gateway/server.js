import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser"
import cors from "cors"
// local imports

import setupProxy from "./config/proxy.js";
import setupAuth from "./config/auth.js";
import { ROUTES } from "./config/routes.js";


//env setup
dotenv.config()

//app and middleware
const app = express()

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// app.use(bodyParser.urlencoded({
//     extended: true
//   }));
// app.use(bodyParser.json());
setupAuth(app,ROUTES)
setupProxy(app,ROUTES)

app.listen(process.env.PORT,()=>{
    console.log(`API Gateway listening on port ${process.env.PORT}`)
})