const sendMail = require("../utils/oAuth");
const mailService = require("../services/mail-services");
const { VERIFICATION_SECRET, AUTH_SERVICE } = require("../config/serverConfig");
const httpStatusCode = require("../utils/httpStatusCode");

const sendVerificationEmailToUser = async (req, res) => {
  const verificationDetails = req.body;
  try {
    //Send email for email verification
    const response = await sendMail(verificationDetails);
    return res.send(response);
  } catch (error) {
    return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send(error);
  }
};

const verificationOfUser = async (req, res) => {
  const { token, email } = req.query;
  try {
    if (email && token) {
      const url = `${AUTH_SERVICE}/api/v1/user/update-verification?user=${encodeURIComponent(
        email
      )}`;
      const response = await mailService.tokenVerification(
        token,
        email,
        url,
        VERIFICATION_SECRET
      );
      // TODO : Make user to redirect to login page after verification complete.
      return res.status(httpStatusCode.OK).send(response.data);
    }
  } catch (error) {
    return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).send(error);
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
