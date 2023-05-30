import mongoose from "mongoose";
import dotenv from "dotenv"
import amqp from "amqplib/callback_api.js";

import connectRabbitMQ from "../config/messaging.js";

dotenv.config()

const channel = await connectRabbitMQ(process.env.RABBIT_URL,process.env.RABBIT_QUEUE)

const pollSchema = mongoose.Schema({
  name: { type: String, index: { unique: false }, required: true },
  owner: { type: String },
  options: { type: [String] },
  expire: { type: Date },
});


// mongoose hook
pollSchema.post("save", function (doc) {
  try{
    channel.sendToQueue(process.env.RABBIT_QUEUE, Buffer.from(JSON.stringify(doc)))
    console.log(" [RabbitMQ] Sent %s", doc);
  }
  catch(error){
    console.log(" [RabbitMQ]",error)
  }
  
});

export default pollSchema;
