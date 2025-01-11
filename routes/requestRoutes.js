import express from "express";

import { approveQuotation, createRequest, getAllRequests, passRequestToProvider, selectQuotation, sendBackToClient } from "../controllers/requestControllers.js";

const requestRoutes = express.Router();

requestRoutes.post("/create", createRequest);

requestRoutes.patch("/pass-request-to-provider", passRequestToProvider);
requestRoutes.patch("/approve-quotation", approveQuotation);
requestRoutes.patch("/send-back-to-client", sendBackToClient);
requestRoutes.patch("/select-quotation", selectQuotation);

requestRoutes.get("/get-all", getAllRequests);

export default requestRoutes;