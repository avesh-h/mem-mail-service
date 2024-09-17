const axios = require("axios");
const sendMail = require("../utils/oAuth");

const sendVerificationEmailToUser = async (req, res) => {
  const verificationDetails = req.body;
  try {
    //Send email for email verification
    const response = await sendMail(verificationDetails);
    return res.send(response);
  } catch (error) {
    return res.status(500).send(error);
  }
};

const verificationOfUser = (req, res) => {
  const { token, email } = req.query;
  try {
    //Decode the token
    //get email from the token
    //Check the user with that email account created
    //Check then isVerify false
    //Then ture to true
  } catch (error) {}
};

module.exports = { verificationOfUser, sendVerificationEmailToUser };
