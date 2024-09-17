const express = require("express");
const { PORT } = require("./config/serverConfig");
const cors = require("cors");
const serverRoutes = require("./routes/index");
const bodyParser = require("body-parser");

const setupAndStartServer = () => {
  const app = express();
  app.use(cors());
  app.use(bodyParser.json({ limit: "30mb", extended: true }));
  app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

  app.use("/api", serverRoutes);

  app.listen(PORT, () => {
    console.log("Mail Service is now on " + PORT);
  });
};

setupAndStartServer();
