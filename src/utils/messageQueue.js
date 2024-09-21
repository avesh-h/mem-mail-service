const amqplib = require("amqplib");
const { MESSAGE_BROKER_URL, EXCHANGE_NAME } = require("../config/serverConfig");

const QUEUE_NAME = "mail_queue";

// Create channel function
const createChannel = async () => {
  try {
    const conn = await amqplib.connect(MESSAGE_BROKER_URL);
    const channel = await conn.createChannel();
    await channel.assertExchange(EXCHANGE_NAME);
    return channel;
  } catch (error) {
    return error;
  }
};

// Subscribe to channel function
const subscribeToMessage = async (channel, binding_key, service) => {
  try {
    const applicationQueue = await channel.assertQueue(QUEUE_NAME);

    // Now bind this queue with the exchange for the get message

    channel.bindQueue(applicationQueue.queue, EXCHANGE_NAME, binding_key);

    channel.consume(applicationQueue.queue, (msg) => {
      console.log("msggggg", msg?.content?.toString());
      //   channel.ack("Message received!!");
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
