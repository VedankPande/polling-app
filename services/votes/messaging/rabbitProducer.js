import amqp from "amqplib/callback_api.js";

import connectRabbitConsumer from "./rabbitConsumer.js";

//TODO: Optimization: check if a new channel is created every time or not
const sendRabbitMessage = (channel, receiverQueue, message) =>{

    try{
      channel.sendToQueue(
        receiverQueue,
        Buffer.from(JSON.stringify(message))
      )
    } catch (error){
      console.log(" [RabbitMQ]", error);
    }
  
  }


export default sendRabbitMessage