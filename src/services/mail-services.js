const axios = require("axios");
const sendMail = require("../utils/oAuth");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/errors/error-handler");
const { VERIFICATION_SECRET, AUTH_SERVICE } = require("../config/serverConfig");

class MailServices {
  async emailService(payload) {
    try {
      const emailBody = {
        ...payload,
        email: payload?.email,
        html: `<h4>You've created post successfully please click on the link to view <a href="http://localhost:3000/posts">${payload?.name}</a><h4>`,
      };
      const response = await sendMail(emailBody);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async tokenVerification(token, email) {
    try {
      const decoded = jwt.verify(token, VERIFICATION_SECRET);
      //get email from the token
      const response = await axios.get(
        `${AUTH_SERVICE}/api/v1/user/update-verification?user=${encodeURIComponent(
          email || decoded?.email
        )}`
      );
      return response;
    } catch (error) {
      throw new AppError(
        error.name,
        error.message,
        error.explanation,
        error.statusCode
      );
    }
  }
}

module.exports = new MailServices();
