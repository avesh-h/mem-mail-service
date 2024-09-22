const axios = require("axios");
const sendMail = require("../utils/oAuth");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/errors/error-handler");

class MailServices {
  async emailService(payload) {
    try {
      const response = await sendMail(payload);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async tokenVerification(token, email, url, secret) {
    try {
      const decoded = jwt.verify(token, secret);
      //get email from the token
      const response = await axios.get(url);
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
