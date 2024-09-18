const axios = require("axios");
const sendMail = require("../utils/oAuth");
const jwt = require("jsonwebtoken");
const { VERIFICATION_SECRET, AUTH_SERVICE } = require("../config/serverConfig");

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

const verificationOfUser = async (req, res) => {
  const { token, email } = req.query;
  try {
    if (email && token) {
      //Decode the token
      const decoded = jwt.verify(token, VERIFICATION_SECRET);
      //get email from the token
      const response = await axios.get(
        `${AUTH_SERVICE}/api/v1/user/update-verification?user=${encodeURIComponent(
          email || decoded?.email
        )}`
      );
      // TODO : Make user to redirect to login page after verification complete.
      return res.status(200).send(response.data);
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

module.exports = { verificationOfUser, sendVerificationEmailToUser };
