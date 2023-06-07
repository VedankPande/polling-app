import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import http from "http";
import { Server } from "socket.io";

import wsRouter from "./routes/wsRoute.js";
import { SocketAddress } from "net";
dotenv.config();

//setup websocket server
const app = express();

//express middleware
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

app.use("/ws", wsRouter);

const server = http.createServer(app);
const io = new Server(server);

const options = ["a", "b", "c", "d","e","f"];

io.on("connection", (socket) => {
  console.log("A user connected to ws server");

  // setInterval(function(){
  //   socket.emit("vote", {
  //     option: options[Math.floor(Math.random() * options.length)],
  //   });
  //   console.log("sent vote")
  // }, 1000);

  // handle room join for poll
  socket.on("join-poll-room",(poll)=>{
    console.log(poll)
    socket.join(poll)
    
    socket.to(poll).emit("client-connected",{"message":` ${socket.id} connected to ${poll}`})
  })

  socket.on("disconnect", () => {
    console.log("A user disconnected from the ws server");
  });

});

server.listen(process.env.PORT, () => {
  console.log(
    `Websockets microservice listening on http://localhost:${process.env.PORT}`
  );
});
