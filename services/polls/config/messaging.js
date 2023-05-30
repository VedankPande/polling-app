//TODO: Create function that connects to RabbitMQ here and export
import amqp from "amqplib/callback_api.js";

const connectRabbitMQ = (url, queue) => {
  return new Promise((resolve, reject) => {
    console.log("[RabbitMQ] Creating new connection")
    amqp.connect(url, (error, connection) => {
      //deal with errors
      if (error) {
        console.log("reject connection", error);
        reject(error);
        return;
      }
      connection.on("error", function (err) {
        console.log("[AMQP]: Error:", err);
      });
      connection.on("close", () => {
        console.log("[AMQP]: Closed");
      });

      //if successful connection
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

export default connectRabbitMQ;
