import express from "express";
import dotenv from "dotenv";
import path from "path";

import { fileURLToPath } from "url";

dotenv.config();

import db from "./libs/db.js";

// Import Routers
import authRoute from "./routers/authRoute.js";
import postRoute from "./routers/postRoute.js";

const PORT = process.env.PORT;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "dist"))); // or 'build' for Client Rendering

// Apply Routers
app.use("/api/v1/auth/admin", authRoute);
app.use("/api/v1/post", postRoute);

app.listen(PORT, async (err) => {
  await db.connectDB();
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Server is running on port ${PORT}. http://localhost:${PORT}`);
});
