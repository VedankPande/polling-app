import mongoose from "mongoose";
import dotenv from "dotenv";

import {connectRabbitMQ,sendRabbitMessage} from "../config/messaging.js";

/**
 * @openapi
 * components:
 *   schemas:
 *     Poll:
 *       type: object
 *       required:
 *         - name
 *         - owner
 *         - options
 *         - expire
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the poll
 *         name:
 *           type: string
 *           description: The name of your poll
 *         owner:
 *           type: string
 *           description: The id of the user that created the poll
 *         options:
 *           type: array
 *           description: A list of vote options for the poll
 *         exipire:
 *           type: date
 *           description: A timestamp that marks when the poll ends
 *       example:
 *         id: d5fE_asz
 *         name: Election Poll
 *         owner: asdfasdf_ASDf
 *         options: [a,b,c,d]
 *         expire: 2020-03-10T04:05:06.157Z
 */

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
