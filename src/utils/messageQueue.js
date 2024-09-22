const amqplib = require("amqplib");
const { MESSAGE_BROKER_URL, EXCHANGE_NAME } = require("../config/serverConfig");

const QUEUE_NAME = "mail_queue";

// Create channel function
const createChannel = async () => {
  try {
    const conn = await amqplib.connect(MESSAGE_BROKER_URL);
    const channel = await conn.createChannel();
    await channel.assertExchange(EXCHANGE_NAME);

    // Handle connection errors
    conn.on("error", (err) => {
      console.error("Connection error:", err);
    });

    // Handle unexpected connection closures and reconnect
    conn.on("close", () => {
      console.warn("Connection to RabbitMQ closed, reconnecting...");
      setTimeout(createChannel, 1000); // Attempt to reconnect after 1 second
    });

    return channel;
  } catch (error) {
    console.error("Error in creating channel:", error);
    setTimeout(createChannel, 1000); // Reattempt after 1 second on failure
  }
};

// Subscribe to channel function
const subscribeToMessage = async (channel, binding_key, service) => {
  try {
    const applicationQueue = await channel.assertQueue(QUEUE_NAME);

    // Now bind this queue with the exchange for the get message

    channel.bindQueue(applicationQueue.queue, EXCHANGE_NAME, binding_key);

    channel.consume(applicationQueue.queue, (msg) => {
      let message = JSON.parse(msg?.content?.toString());
      // Acknowledge the message
      service(message);
      channel.ack(msg);
    });
  } catch (error) {
    console.log("SUBSCRIBE_MESSAGE:::::::", error);
  }
};

// Publist to channel function
const publishMessage = async (channel, binding_key, msg) => {
  try {
    await channel.assertQueue(QUEUE_NAME);
    await channel.publish(EXCHANGE_NAME, binding_key, Buffer.from(msg));
  } catch (error) {
    console.log("PUBLISH_MESSAGE:::::::", error);
  }
};

module.exports = { createChannel, subscribeToMessage, publishMessage };
