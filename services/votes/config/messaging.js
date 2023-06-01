import amqp from "amqplib/callback_api.js";
import mongoose from "mongoose";

//TODO: Setup consumer for votes-poll queue here, with ack

const connectRabbitConsumer = (url, queue) => {
    amqp.connect(url, (error, connection) => {
        if (error) {
          returnl
        }
        connection.createChannel((channelError,channel)=>{
          if (channelError){
              return;
          }
  
          channel.assertQueue(queue,{
              durable:false
          })
  
          channel.consume(queue,(message)=>{
            const messageJSON = JSON.parse(message.content)
            console.log(`received message: ${JSON.stringify(messageJSON)}`)
          },{noAck:true})
  
          console.log(`RabbitMQ Consumer listening for messages on ${queue}`)
        })
      });
};

export default connectRabbitConsumer;
