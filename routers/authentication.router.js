import express from "express";

// import actions
import { SignIn, SignUp } from "../functions/auth.js";

// import utils
import { Success, Error } from "../utils/responseHandler.js";

const authenticationRouter = express.Router();

authenticationRouter.post("/sign-up", async (req, res) => {
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

  const sign_up = await SignUp(username, email, password);

  if (!sign_up) {
    res.json(Error(500, "Something went wrong", sign_up));
  }

  res.json(Success(201, "Successfully create new admin account!"));
});

authenticationRouter.post("/sign-in", async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    res.json(Error(403, "Email is invalid"));
    return;
  }

  if (!password) {
    res.json(Error(403, "Password is invalid"));
    return;
  }

  const sign_in = await SignIn(email, password);

  if (!sign_in) {
    res.json(Error(500, "Something went wrong", sign_in));
    return;
  }

  res.json(Success(200, "sign in successfully"));
});

export default authenticationRouter;
