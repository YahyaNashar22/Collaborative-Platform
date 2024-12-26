import express from "express";

import { createRequest, getAllRequests } from "../controllers/requestControllers.js";

const requestRoutes = express.Router();

// TODO: ADD ENDPOINTS
requestRoutes.post("/create", createRequest);
requestRoutes.get("/get-all", getAllRequests);

export default requestRoutes;