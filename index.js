import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import chalk from "chalk";

import databaseConnection from "./db/databaseConnection.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import quotationRoutes from "./routes/quotationRoutes.js";
import requestRoutes from "./routes/requestRoutes.js";
import otpRoutes from "./routes/otpRoutes.js";
import path from "path";

// Declaration
dotenv.config();
const app = express();

// CORS Policies
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

// Configuration Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Routes / APIs
app.use("/services", serviceRoutes);
app.use("/users", userRoutes);
app.use("/projects", projectRoutes);
app.use("/feedbacks", feedbackRoutes);
app.use("/quotations", quotationRoutes);
app.use("/requests", requestRoutes);
app.use("/otp", otpRoutes);

// Connect to server
app.listen(process.env.PORT, (error) => {
  if (!error) {
    console.log(chalk.blue.bold(`Server Running On Port: ${process.env.PORT}`));
  } else {
    console.log(chalk.red.bold("Couldn't Connect To Server!"));
    console.error(`Error: ${error}`);
  }
});
databaseConnection();
