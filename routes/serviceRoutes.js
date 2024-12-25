import express from "express";

import { createServiceController, deleteServiceController, editServiceController, getAllServicesController, getSingleServiceByIdController } from "../controllers/serviceControllers.js";
import upload from "../middlewares/multer.js";

const serviceRoutes = express.Router();

serviceRoutes.post("/create", upload.single("image"), createServiceController);
serviceRoutes.put("/edit/:id", upload.single("image"), editServiceController);
serviceRoutes.get("/get-all", getAllServicesController);
serviceRoutes.get("/get/:id", getSingleServiceByIdController);
serviceRoutes.delete("/delete/:id", deleteServiceController);



export default serviceRoutes;