//TODO: Create function that connects to RabbitMQ here and export
import amqp from "amqplib/callback_api.js";

//TODO: check if a new channel is created for every message send. Optimize if yes
const connectRabbitMQ = (url, queue) => {
  return new Promise((resolve, reject) => {
    console.log("[RabbitMQ] Creating new connection")
    amqp.connect(url, (error, connection) => {
      //error creating connection
      if (error) {
        console.log("reject connection", error);
        reject(error);
        return;
      }
      //error event in queue
      connection.on("error", function (err) {
        console.log("[AMQP]: Error:", err);
      });
      //close event
      connection.on("close", () => {
        console.log("[AMQP]: Closed");
      });

      //successful connection
      connection.createChannel((channelError, channel) => {
        if (channelError) {
          console.log(channelError);
          reject(channelError);
          return;
        }
        channel.assertQueue(queue, {
          durable: false,
        });

        resolve(channel);
      });
    });
  });
};

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

export {connectRabbitMQ,sendRabbitMessage};
