import express from "express";
import { deleteUser, getAllUsers, getUserById, registerAdmin } from "../controllers/userControllers.js";

const userRoutes = express.Router();
// TODO: Continue after finding a cloud storage

userRoutes.post("/new-admin", registerAdmin);
userRoutes.get("/get-all", getAllUsers);
userRoutes.get("/get-single/:id", getUserById);
userRoutes.delete("/delete/:id", deleteUser);

export default userRoutes;