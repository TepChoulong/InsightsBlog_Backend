import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";

function verfiyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401).json({ error: "Unauthorized" });

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    if (!decode) return res.sendStatus(401).json({ error: decode.error });

    req.user = decode.user;
    next();
  } catch (error) {
    res.json({ error: "Invalid token" }).status(401);
  }
}

export default verfiyToken;
