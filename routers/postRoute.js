import express from "express";

// import middlewares
import verfiyToken from "../libs/middlewares/authMiddleware.js";

const postRoute = express.Router();

postRoute.get("/", verfiyToken, (req, res) => {
  res.send("Post Route");
});

export default postRoute;
