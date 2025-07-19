import express from "express";
import { upload } from "../middlewares/multer.js";

import {
  approveQuotation,
  cancelRequest,
  createRequest,
  deleteRequest,
  getAllClientRequests,
  getAllProviderRequests,
  getAllRequests,
  getSingleRequest,
  passRequestToProvider,
  requestRequestMeeting,
  selectQuotation,
  sendBackToClient,
} from "../controllers/requestControllers.js";

const requestRoutes = express.Router();

requestRoutes.post("/create", upload.single("document"), createRequest);
requestRoutes.post("/request-meeting/:id", requestRequestMeeting);

requestRoutes.get("/get-single/:id", getSingleRequest);

requestRoutes.patch("/pass-request-to-provider", passRequestToProvider);
requestRoutes.patch("/approve-quotation", approveQuotation);
requestRoutes.patch("/send-back-to-client", sendBackToClient);
requestRoutes.patch("/select-quotation", selectQuotation);
requestRoutes.patch("/cancel-request", cancelRequest);

requestRoutes.post("/get-all", getAllRequests);
requestRoutes.post("/get-all-provider", getAllProviderRequests);
requestRoutes.post("/get-all-client", getAllClientRequests);

requestRoutes.delete("/delete/:id", deleteRequest);

export default requestRoutes;
