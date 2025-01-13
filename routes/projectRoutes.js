import express from "express";
import { changeProjectStage, deleteProject, getAllProjects, getProjectById, markProjectAsCompleted, requestFiles, startProject, uploadFiles } from "../controllers/projectControllers.js";
import { upload } from "../middlewares/multer.js";
import checkProjectFilesState from "../middlewares/checkProjectFileState.js";

const projectRoutes = express.Router();

projectRoutes.post("/start", startProject);
projectRoutes.post("/get-all", getAllProjects);

projectRoutes.patch("/mark-as-complete/:id", markProjectAsCompleted);
projectRoutes.patch("/change-stage/:id", changeProjectStage);
projectRoutes.patch("/request-files/:id", requestFiles);
projectRoutes.patch("/upload-files/:id", checkProjectFilesState, upload.single("projectFiles"), uploadFiles);

projectRoutes.get("/get-single/:id", getProjectById);

projectRoutes.delete("/delete/:id", deleteProject);

export default projectRoutes;