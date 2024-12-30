import express from "express";

import upload from "../middlewares/multer.js";
import { deleteUser, getAllUsers, getUserById, registerSuper, sendEmail } from "../controllers/userControllers.js";

const userRoutes = express.Router();
// TODO: Continue after finding a cloud storage

userRoutes.post("/new-super", upload.single("image"), registerSuper);
userRoutes.get("/get-all", getAllUsers);
userRoutes.get("/get-single/:id", getUserById);
userRoutes.delete("/delete/:id", deleteUser);


userRoutes.post("/test-email", sendEmail)

export default userRoutes;