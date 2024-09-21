const express = require("express");
const { PORT } = require("./config/serverConfig");
const cors = require("cors");
const serverRoutes = require("./routes/index");
const bodyParser = require("body-parser");
const { createChannel, subscribeToMessage } = require("./utils/messageQueue");
const { emailService } = require("./controller/mail-controller");

const setupAndStartServer = async () => {
  const app = express();
  app.use(cors());
  app.use(bodyParser.json({ limit: "30mb", extended: true }));
  app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

  const channel = await createChannel();

  // Express provides the store kind of things where you can store anything and can access it any routes and controller.

  // So these are the both approach the way we can pass this common channel in the whole project accssible in routes and controllers. first here and second in the post service.

  app.locals.channel = channel;

  //Subscribe to post events it will keep looking for event from other services.
  await subscribeToMessage(channel, "post_service", emailService);

  app.use("/api", serverRoutes);

  app.listen(PORT, async () => {
    console.log("Mail Service is now on " + PORT);
  });
};

setupAndStartServer();
