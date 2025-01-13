import express from "express";

import { approveQuotation, cancelRequest, createRequest, deleteRequest, getAllClientOrProviderRequests, getAllRequests, getSingleRequest, passRequestToProvider, requestRequestMeeting, selectQuotation, sendBackToClient } from "../controllers/requestControllers.js";

const requestRoutes = express.Router();

requestRoutes.post("/create", createRequest);
requestRoutes.post("/request-meeting/:id", requestRequestMeeting);

requestRoutes.get("/get-single/:id", getSingleRequest);

requestRoutes.patch("/pass-request-to-provider", passRequestToProvider);
requestRoutes.patch("/approve-quotation", approveQuotation);
requestRoutes.patch("/send-back-to-client", sendBackToClient);
requestRoutes.patch("/select-quotation", selectQuotation);
requestRoutes.patch("/cancel-request", cancelRequest);

requestRoutes.post("/get-all", getAllRequests);
requestRoutes.post("/get-all-client-or-provider", getAllClientOrProviderRequests);

requestRoutes.delete("/delete/:id", deleteRequest);

export default requestRoutes;