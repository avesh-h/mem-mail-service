const sendMail = require("../utils/oAuth");
const mailService = require("../services/mail-services");

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
      const response = await mailService.tokenVerification(token, email);
      // TODO : Make user to redirect to login page after verification complete.
      return res.status(200).send(response.data);
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};

const emailService = async (payload) => {
  try {
    await mailService.emailService(payload);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  verificationOfUser,
  sendVerificationEmailToUser,
  emailService,
};
