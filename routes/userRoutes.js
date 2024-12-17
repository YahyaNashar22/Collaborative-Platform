import express from "express";
import { deleteUser, getAllUsers, getUserById, registerSuper } from "../controllers/userControllers.js";

const userRoutes = express.Router();
// TODO: Continue after finding a cloud storage

userRoutes.post("/new-super", registerSuper);
userRoutes.get("/get-all", getAllUsers);
userRoutes.get("/get-single/:id", getUserById);
userRoutes.delete("/delete/:id", deleteUser);

export default userRoutes;