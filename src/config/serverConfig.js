require("dotenv").config();

module.exports = {
  PORT: process.env.PORT,
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  REFRESH_TOKEN: process.env.REFRESH_TOKEN,
  REDIRECT_URI: process.env.REDIRECT_URI,
  VERIFICATION_SECRET: process.env.VERIFICATION_SECRET,
  AUTH_SERVICE: process.env.AUTH_SERVICE,
  MESSAGE_BROKER_URL: process.env.MESSAGE_BROKER_URL,
  EXCHANGE_NAME: process.env.EXCHANGE_NAME,
};
