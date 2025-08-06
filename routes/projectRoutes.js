import express from "express";
import {
  changeProjectStage,
  createStage,
  deleteFiles,
  deleteProject,
  deleteStage,
  getAllClientProjects,
  getAllProjects,
  getAllProviderProjects,
  getProjectById,
  //   markProjectAsCompleted,
  requestFiles,
  requestProjectMeeting,
  sendProjectTicket,
  markProjectAsCompleted,
  startProject,
  updateStages,
  uploadFiles,
} from "../controllers/projectControllers.js";
import { upload } from "../middlewares/multer.js";
import { authMiddleware } from "../middlewares/checkAuth.js";
import checkProjectFilesState from "../middlewares/checkProjectFileState.js";

const projectRoutes = express.Router();

projectRoutes.post("/start", startProject);
projectRoutes.post("/get-all", getAllProjects);
projectRoutes.post("/get-all-for-client", getAllClientProjects);
projectRoutes.post("/get-all-for-provider", getAllProviderProjects);

projectRoutes.post("/send-ticket/:id", sendProjectTicket);
projectRoutes.post("/request-meeting/:id", requestProjectMeeting);

// projectRoutes.patch("/mark-as-complete/:id", markProjectAsCompleted);
projectRoutes.patch("/change-stage/:id", changeProjectStage);
projectRoutes.patch("/request-files/:id", authMiddleware, requestFiles);
projectRoutes.patch(
  "/upload-files/:id/:stageId",
  // checkProjectFilesState,
  upload.array("projectFiles", 5),
  uploadFiles
);
projectRoutes.patch("/delete-files/:id", deleteFiles);
projectRoutes.post("/create-stage/:projectId", createStage);
projectRoutes.patch(
  "/complete-stage/:projectId/:stageId",
  markProjectAsCompleted
);
projectRoutes.patch("/update-stage/:projectId", updateStages);
projectRoutes.delete("/delete-stage/:projectId/:stageId", deleteStage);

projectRoutes.get("/get-single/:id", getProjectById);

projectRoutes.delete("/delete/:id", deleteProject);

export default projectRoutes;
