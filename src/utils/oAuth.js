const { google } = require("googleapis");
const {
  CLIENT_ID,
  REDIRECT_URI,
  CLIENT_SECRET,
  REFRESH_TOKEN,
} = require("../config/serverConfig");
const nodemailer = require("nodemailer");

//Set oAuth client
const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

//Set creadential for the oAuth2Client that we just created
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

//Our main function for sendMail
const sendMail = async ({ email, message, verificationLink = "" }) => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    //Create the transport for send mail
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "aveshhasanfatta1155+memories.support@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken,
      },
    });
    //Details of the mail
    const mailOptions = {
      from: "MEMORIES APP SUPPORT TEAM <aveshhasanfatta1155+memories.support@gmail.com>", //Sender
      to: email,
      subject: "Email Verification",
      text: message,
      ...(!!verificationLink && {
        html: `<h1>Verification Link : ${verificationLink}</h1>`,
      }),
    };
    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = sendMail;
