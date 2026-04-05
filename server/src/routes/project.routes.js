import express from "express";
import auth from "../middleware/auth.js";
import {
  createProject,
  getProjects,
  getProjectById,
  deleteProject
} from "../controllers/project.controller.js";

const router = express.Router();

router.post("/", auth, createProject);
router.get("/", auth, getProjects);
router.get("/:id", auth, getProjectById);
router.delete("/:id", auth, deleteProject);

export default router;
