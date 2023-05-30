import mongoose from "mongoose";
import dotenv from "dotenv";

import connectRabbitMQ from "../config/messaging.js";

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
  console.log("Saved polls document")
  const message = { action: "save", ...doc };
  try {
    channel.sendToQueue(
      process.env.RABBIT_QUEUE,
      Buffer.from(JSON.stringify(message))
    );
    console.log(" [RabbitMQ] Sent %s", doc);
  } catch (error) {
    console.log(" [RabbitMQ]", error);
  }
});

pollSchema.post("remove", (doc) => {

  console.log("Deleted polls document");
  const message = { action: "remove", ...doc };
  
  try {
    channel.sendToQueue(
      process.env.RABBIT_QUEUE,
      Buffer.from(JSON.stringify(message))
    );
    console.log(" [RabbitMQ] Sent %s", doc);
  } catch (error) {
    console.log(" [RabbitMQ]", error);
  }

});

export default pollSchema;
