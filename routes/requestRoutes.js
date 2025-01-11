import express from "express";

import { createRequest, getAllRequests, passRequestToProvider } from "../controllers/requestControllers.js";

const requestRoutes = express.Router();

requestRoutes.post("/create", createRequest);

requestRoutes.patch("/pass-request-to-provider", passRequestToProvider);

requestRoutes.get("/get-all", getAllRequests);

export default requestRoutes;