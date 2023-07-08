import mongoose from "mongoose";
import dotenv from "dotenv";

import {connectRabbitMQ,sendRabbitMessage} from "../config/messaging.js";

dotenv.config();

const channel = await connectRabbitMQ(
  process.env.RABBIT_URL,
  process.env.RABBIT_QUEUE
);

const pollSchema = mongoose.Schema({
  name: { type: String, index: { unique: false }, required: true },
  owner: { type: String },
  options: { type: [String] },
  expire: { type: Date },
});

// mongoose hook
pollSchema.post("save", function (doc) {

  const message = { action: "save", ...doc._doc };
  //send message to queue
  sendRabbitMessage(channel,process.env.RABBIT_QUEUE,message)
});

pollSchema.post("deleteOne", function(doc){

  const message = { action: "delete", id: this.getQuery()._id.toString() };
  //send message to queue
  sendRabbitMessage(channel,process.env.RABBIT_QUEUE,message)


});

export default pollSchema;
