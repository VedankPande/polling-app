import amqp from "amqplib"
import connectRabbitMQ from "./myRabbitMQ.js";

const connectWebsocketRabbitConsumer  = async (websocketIO,url, queue) =>{
  
    //get MQ channel
    const channel = await connectRabbitMQ(
      url,
      queue
    );
  
    channel.consume(queue, (message)=>{
  
      const messageJSON = JSON.parse(message.content)
      websocketIO.to(messageJSON.poll).emit("update","someone voted!")
      console.log(`received message: ${JSON.stringify(messageJSON)}`)
      
    },{noAck:true})
  
    console.log(`RabbitMQ Consumer listening for messages on ${queue}`)
  }


export default connectWebsocketRabbitConsumer