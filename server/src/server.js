import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { initDB } from "./config/initDB.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Music AI Server Running" });
});

const PORT = process.env.PORT || 10000;

const startServer = async () => {
  await initDB();

  app.listen(PORT, () => {
    console.log("Server running on port", PORT);
  });
};

startServer();
