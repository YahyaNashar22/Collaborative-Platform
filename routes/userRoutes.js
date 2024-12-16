import express from "express";
import { registerAdmin } from "../controllers/userControllers.js";

const userRoutes = express.Router();
// TODO: Continue after finding a cloud storage

userRoutes.post("/new-admin", registerAdmin);

export default userRoutes;