import express from "express";
import { getAllProjects, markProjectAsCompleted, startProject } from "../controllers/projectControllers.js";

const projectRouter = express.Router();

projectRouter.post("/start", startProject);
projectRouter.put("/mark-as-complete/:id", markProjectAsCompleted);
projectRouter.post("/get-all", getAllProjects);

export default projectRouter;