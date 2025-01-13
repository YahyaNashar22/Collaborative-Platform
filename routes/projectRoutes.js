import express from "express";
import { changeProjectStage, deleteFiles, deleteProject, getAllProjects, getProjectById, markProjectAsCompleted, requestFiles, requestProjectMeeting, sendProjectTicket, startProject, uploadFiles } from "../controllers/projectControllers.js";
import { upload } from "../middlewares/multer.js";
import checkProjectFilesState from "../middlewares/checkProjectFileState.js";

const projectRoutes = express.Router();

projectRoutes.post("/start", startProject);
projectRoutes.post("/get-all", getAllProjects);
projectRoutes.post("/send-ticket/:id", sendProjectTicket);
projectRoutes.post("/request-meeting/:id", requestProjectMeeting);


projectRoutes.patch("/mark-as-complete/:id", markProjectAsCompleted);
projectRoutes.patch("/change-stage/:id", changeProjectStage);
projectRoutes.patch("/request-files/:id", requestFiles);
projectRoutes.patch("/upload-files/:id", checkProjectFilesState, upload.single("projectFiles"), uploadFiles);
projectRoutes.patch("/delete-files/:id", deleteFiles);

projectRoutes.get("/get-single/:id", getProjectById);

projectRoutes.delete("/delete/:id", deleteProject);

export default projectRoutes;