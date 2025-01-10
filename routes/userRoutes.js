import express from "express";

import { upload, uploadClientFiles, uploadProviderFiles } from "../middlewares/multer.js";
import { changePassword, changeProviderAvailability, changeUserBannedStatus, deleteUser, editClientProfile, editSuperProfile, getAllUsers, getUserById, login, registerClient, registerProvider, registerSuper, sendEmail, sendSMS, verifyPassword } from "../controllers/userControllers.js";

const userRoutes = express.Router();

userRoutes.post("/new-super", upload.single("image"), registerSuper);
userRoutes.post("/new-client", uploadClientFiles, registerClient);
userRoutes.post("/new-provider", uploadProviderFiles, registerProvider);

userRoutes.post("/log-in", login);

userRoutes.post("/verify-password/:id", verifyPassword);

userRoutes.patch("/change-password/:id", changePassword);
userRoutes.patch("/ban/:id", changeUserBannedStatus);
userRoutes.patch("/change-availability/:id", changeProviderAvailability);

userRoutes.patch("/edit-super/:id", editSuperProfile);
userRoutes.patch("/edit-client/:id", editClientProfile);



userRoutes.get("/get-all", getAllUsers);
userRoutes.get("/get-single/:id", getUserById);
userRoutes.delete("/delete/:id", deleteUser);


userRoutes.post("/test-email", sendEmail);
userRoutes.post("/test-sms", sendSMS);


export default userRoutes;