import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import chalk from "chalk";
import { fileURLToPath } from 'url';
import path from "path";

import databaseConnection from "./db/databaseConnection.js";
import serviceRoutes from "./routes/serviceRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
// import feedbackRoutes from "./routes/feedbackRoutes.js";
import quotationRoutes from "./routes/quotationRoutes.js";
import requestRoutes from "./routes/requestRoutes.js";
import otpRoutes from "./routes/otpRoutes.js";


// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Declaration
dotenv.config();
const app = express();

// CORS Policies
app.use(
  cors({
    origin: ["http://localhost:5173", "http://174.142.205.14", "http://174.142.205.14:3004", "https://takatof.beproagency.com", "http://takatof.beproagency.com"],
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
// app.use("/feedbacks", feedbackRoutes);
app.use("/quotations", quotationRoutes);
app.use("/requests", requestRoutes);
app.use("/otp", otpRoutes);


// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client', 'dist')));

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});


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
