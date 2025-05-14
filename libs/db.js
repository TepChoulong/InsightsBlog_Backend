import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

async function connectDB() {
  try {
    const connected = await mongoose.connect(process.env.MONGODB_URI);

    if (!connected) {
      console.log("Something Went Wrong While Connecting to the DB!");
    }

    console.log("Successfully Connected to the DB");
  } catch (err) {
    console.log(err);
  }
}

const db = { connectDB };

export default db;
