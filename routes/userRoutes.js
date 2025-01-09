import express from "express";

import { upload, uploadClientFiles, uploadProviderFiles } from "../middlewares/multer.js";
import { deleteUser, getAllUsers, getUserById, registerClient, registerProvider, registerSuper, sendEmail, sendSMS } from "../controllers/userControllers.js";

const userRoutes = express.Router();

userRoutes.post("/new-super", upload.single("image"), registerSuper);
userRoutes.post("/new-client", uploadClientFiles, registerClient);
userRoutes.post("/new-provider", uploadProviderFiles, registerProvider);


userRoutes.get("/get-all", getAllUsers);
userRoutes.get("/get-single/:id", getUserById);
userRoutes.delete("/delete/:id", deleteUser);


userRoutes.post("/test-email", sendEmail);
userRoutes.post("/test-sms", sendSMS);


export default userRoutes;