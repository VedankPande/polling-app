import amqp from "amqplib/callback_api.js";
import mongoose from "mongoose";

import votesSchema from "../model/votes.js";
import { handleSave,handleDelete } from "../util/messageConsumerUtil.js";

//TODO: Make action handling modular, create a class for the consumer
// instead of one function

const connectRabbitConsumer = (url, queue) => {

    const Votes = mongoose.model("votes",votesSchema)

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
  
          channel.consume(queue, async (message)=>{

            const messageJSON = JSON.parse(message.content)
            console.log(`received message: ${JSON.stringify(messageJSON)}`)
            
            // deal with actions requested by messages
            switch(messageJSON.action){

              //if a poll was created
              case "save":{

                handleSave(messageJSON,Votes)
                break;
              }

              // if a poll was removed (Delete req)
              case "delete":{

                handleDelete(messageJSON,Votes)
                break;
              }

              default:{
                console.log("Error in action of polls")
                break;
              }
            }
          },{noAck:true})
  
          console.log(`RabbitMQ Consumer listening for messages on ${queue}`)
        })
      });
};

export default connectRabbitConsumer;
