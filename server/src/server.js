import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { initDB } from "./config/initDB.js";
import authRoutes from "./routes/auth.routes.js";
import projectRoutes from "./routes/project.routes.js";
import generateRoutes from "./routes/generate.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "2mb" }));

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/generate", generateRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Music AI Server Running" });
});

app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "API healthy" });
});

const PORT = process.env.PORT || 10000;

const startServer = async () => {
  await initDB();

  app.listen(PORT, () => {
    console.log("Server running on port", PORT);
  });
};

startServer();
