const express = require("express");
const {
  verificationOfUser,
  sendVerificationEmailToUser,
} = require("../../controller/mail-controller");

const router = express.Router();

router.post("/send-verification-mail", sendVerificationEmailToUser);

router.get("/verification", verificationOfUser);

module.exports = router;
