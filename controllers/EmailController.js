import expressAsyncHandler from "express-async-handler";

import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const sendEmail = expressAsyncHandler(async (otp, email) => {
  //console.log("sending mail", email);
  //console.log("ye rha otp", otp);
  var mailOptions = {
    from: process.env.SMTP_MAIL,
    to: email,
    subject: "OTP FOR FORGOT PASSWORD",
    text: `Dear User, Your OTP for Resetting your Account Password is Here, Your OTP is: ${otp}`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("send mail me error");
      console.log(error);
    } else {
      console.log("Email sent successfully!");
    }
  });
});

// Export the sendEmail function
//module.exports = { sendEmail };
//export default sendEmail;
