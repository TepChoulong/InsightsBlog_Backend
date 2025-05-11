import express from "express";

// Import Routers
import authenticationRouter from "./routers/authentication.router.js";

const PORT = 3000;

const app = express();

app.use(express.json());

// Apply Routers
app.use("/api/v1/authentication/admin", authenticationRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Server is running on port ${PORT}. http://localhost:${PORT}`);
});
