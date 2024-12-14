import express from "express";

import { createServiceController, deleteServiceController, editServiceController, getAllServicesController, getSingleServiceByIdController } from "../controllers/serviceControllers.js";

const serviceRoutes = express.Router();

serviceRoutes.post("/create", createServiceController);
serviceRoutes.put("/edit/:id", editServiceController);
serviceRoutes.get("/get-all", getAllServicesController);
serviceRoutes.get("/get/:id", getSingleServiceByIdController);
serviceRoutes.delete("/delete/:id", deleteServiceController);



export default serviceRoutes;