import express from "express";

import { approveQuotation, cancelRequest, createRequest, getAllClientOrProviderRequests, getAllRequests, getSingleRequest, passRequestToProvider, selectQuotation, sendBackToClient } from "../controllers/requestControllers.js";

const requestRoutes = express.Router();

requestRoutes.post("/create", createRequest);

requestRoutes.get("/get-single/:id", getSingleRequest);

requestRoutes.patch("/pass-request-to-provider", passRequestToProvider);
requestRoutes.patch("/approve-quotation", approveQuotation);
requestRoutes.patch("/send-back-to-client", sendBackToClient);
requestRoutes.patch("/select-quotation", selectQuotation);
requestRoutes.patch("/cancel-request", cancelRequest);

requestRoutes.post("/get-all", getAllRequests);
requestRoutes.post("/get-all-client-or-provider", getAllClientOrProviderRequests);

export default requestRoutes;