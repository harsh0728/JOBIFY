import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    email: String,
    code: String,
    expiresIn: Number,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("otp", otpSchema, "OTP");
