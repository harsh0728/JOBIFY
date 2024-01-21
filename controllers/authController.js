import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import Otp from "../models/otp.js";
import { sendEmail } from "./EmailController.js";

import { comparePassword, hashPassword } from "../utils/passwordUtils.js";
import { UnauthenticatedError } from "../errors/customErrors.js";
import { createJWT } from "../utils/tokenUtils.js";

// REGISTER
export const register = async (req, res) => {
  const isFirstAccount = (await User.countDocuments()) === 0;
  req.body.role = isFirstAccount ? "admin" : "user";

  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;

  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: "user created" });
};

// LOGIN
export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  const isValidUser =
    user && (await comparePassword(req.body.password, user.password));
  console.log(
    "check password",
    await comparePassword(req.body.password, user.password)
  );

  if (!isValidUser) throw new UnauthenticatedError("invalid credentials");

  const token = createJWT({ userId: user._id, role: user.role });

  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === "production",
  });
  res.status(StatusCodes.OK).json({ msg: "user logged in" });
};

export const logout = (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};

let otpdata;

export const emailSend = async (req, res) => {
  console.log(req.body.email);
  const data = await User.findOne({ email: req.body.email });
  const response = {};
  if (data) {
    let otpcode = Math.floor(Math.random() * 1000000) + 1;
    otpdata = new Otp({
      email: req.body.email,
      code: otpcode,
      expiresIn: new Date().getTime() + 180 * 1000,
    });
    //console.log("OTP", otpdata);
    sendEmail(otpcode, req.body.email);
    let otpResponse = await otpdata.save();
    response.statusText = "success";
    response.message = "Please Check your email id";
  } else {
    response.statusText = "error ";
    response.message = "Email Id not exist";
  }
  res.status(StatusCodes.OK).json({ response });
};

export const changePassword = async (req, res) => {
  const data = await Otp.findOne({
    email: req.body.email,
    code: req.body.otpcode,
  });
  console.log("OTP DATA", data);
  const response = {};
  if (data) {
    let currentTime = new Date().getTime();
    let diff = data.expiresIn - currentTime;
    //checking time is expired or not
    if (diff <= 0) {
      response.statusText = "error";
      response.message = "Otp Expired";
    } else {
      let user = await User.findOne({ email: req.body.email });

      // adding hashing

      const hashedPassword = await hashPassword(req.body.password);
      req.body.password = hashedPassword;
      console.log(hashedPassword);
      user.password = hashedPassword;
      // till here
      user.save();
      res.status(StatusCodes.OK).json({
        response: { statusText: "success", message: "Password Changed" },
      });

      /*
      response.statusText = "success";
      response.message = "Password Changed";
      */
    }
  } else {
    response.statusText = "error";
    response.message = "Invalid Otp";
  }

  res.status(StatusCodes.OK).json(response);
};

export { otpdata }; // Export otpdata variable
