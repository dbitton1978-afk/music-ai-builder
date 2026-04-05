import express from "express";
import auth from "../middleware/auth.js";
import {
  generateProjectSpec,
  getProjectGenerations
} from "../controllers/generate.controller.js";

const router = express.Router();

router.post("/", auth, generateProjectSpec);
router.get("/:projectId/history", auth, getProjectGenerations);

export default router;
