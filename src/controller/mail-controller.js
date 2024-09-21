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
    const emailBody = {
      ...payload,
      email: payload?.email,
      html: `<h4>You've created post successfully please click on the link to view <a href="http://localhost:3000/posts">${payload?.name}</a><h4>`,
    };
    await mailService.emailService(emailBody);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  verificationOfUser,
  sendVerificationEmailToUser,
  emailService,
};
