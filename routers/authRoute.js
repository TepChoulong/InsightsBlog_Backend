import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// import utils
import { Success, Error } from "../utils/responseHandler.js";

// import models
import adminUsers from "../models/adminModel.js";

const authRoute = express.Router();

authRoute.post("/sign-up", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username) {
      res.json(Error(403, "Username is invalid"));
      return;
    }

    if (!email) {
      res.json(Error(403, "Email is invalid"));
      return;
    }

    if (!password) {
      res.json(Error(403, "Password is invalid"));
      return;
    }

    const existingUser = await adminUsers.findOne({ email });

    if (existingUser) {
      res.json(Error(403, "Email already exists"));
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdminUser = await adminUsers.create({
      username,
      email,
      password: hashedPassword,
      role: "admin",
      last_logged_in: Date.now(),
    });

    if (!newAdminUser) {
      res.json(Error(500, "Something went wrong"));
      return;
    }

    res.json(Success(201, "Admin User Created Successfully", newAdminUser));
  } catch (error) {
    res.json(Error(500, "Something went wrong"));
  }
});

authRoute.post("/sign-in", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      res.json(Error(403, "Email is invalid"));
      return;
    }

    if (!password) {
      res.json(Error(403, "Password is invalid"));
      return;
    }

    const existingUser = await adminUsers.findOne({ email });

    if (!existingUser) {
      res.json(Error(403, "Email does not exist"));
      return;
    }

    const isValidPassword = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isValidPassword) {
      res.json(Error(403, "Password is incorrect"));
      return;
    }

    const token = jwt.sign({ user: existingUser }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json(
      Success(200, "Admin User Signed In Successfully", existingUser, token)
    );
  } catch (error) {
    res.json(Error(500, "Something went wrong"));
  }
});

export default authRoute;
