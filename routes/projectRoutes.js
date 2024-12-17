import express from "express";
import { deleteProject, getAllProjects, getProjectById, markProjectAsCompleted, startProject } from "../controllers/projectControllers.js";

const projectRouter = express.Router();

projectRouter.post("/start", startProject);
projectRouter.put("/mark-as-complete/:id", markProjectAsCompleted);
projectRouter.post("/get-all", getAllProjects);
projectRouter.get("/get-single/:id", getProjectById);
projectRouter.delete("/delete/:id", deleteProject);

export default projectRouter;