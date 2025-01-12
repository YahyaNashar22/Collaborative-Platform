import express from "express";
import { changeProjectStage, deleteProject, getAllProjects, getProjectById, markProjectAsCompleted, startProject } from "../controllers/projectControllers.js";

const projectRoutes = express.Router();

projectRoutes.post("/start", startProject);
projectRoutes.patch("/mark-as-complete/:id", markProjectAsCompleted);
projectRoutes.patch("/change-stage/:id", changeProjectStage);
projectRoutes.post("/get-all", getAllProjects);
projectRoutes.get("/get-single/:id", getProjectById);
projectRoutes.delete("/delete/:id", deleteProject);

export default projectRoutes;