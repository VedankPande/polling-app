import amqp from "amqplib/callback_api.js";
import mongoose from "mongoose";
import votesSchema from "../model/votes.js";

//TODO: Setup consumer for votes-poll queue here, with ack, maybe create a class?

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
                
                var votes = []
                
                //create a hashmap with votes and counts
                for (const option of messageJSON.options){
                  votes.push({option,count:0})
                }
                
                //save votes document
                Votes({poll:messageJSON._id,votes}).save()
                break;
              }
              // if a poll was removed (Delete req)
              case "remove":{

                Votes.deleteOne({poll:messageJSON._id}).then(()=>{
                  console.log("poll removed from polls")
                })
                
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
