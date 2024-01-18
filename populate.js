import { readFile } from "fs/promises";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import Job from "./models/JobModel.js";
import User from "./models/UserModel.js";

export const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    const user = await User.findOne({ email: "test@test.com" });
    if (!user) {
      console.error("User not found");
      process.exit(1);
    }
    const jsonJobs = JSON.parse(
      await readFile(new URL("./utils/mockData.json", import.meta.url))
    );

    console.log("Connected to MongoDB");

    console.log("Reading mock data from file...");

    const jobs = jsonJobs.map((job) => {
      return { ...job, createdBy: user._id };
    });
    await Job.deleteMany({ createdBy: user._id });
    await Job.create(jobs);
    console.log("Success!!!");
    //process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
