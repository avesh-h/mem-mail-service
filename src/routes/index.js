const express = require("express");
const mailRoutes = require("./v1/mailRoutes");

const router = express.Router();

router.use("/v1/user", mailRoutes);

module.exports = router;
