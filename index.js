import express from 'express';
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from 'body-parser';
import chalk from 'chalk';

import databaseConnection from "./db/databaseConnection.js";
import serviceRoutes from './routes/serviceRoutes.js';

// Declaration
dotenv.config();
const app = express();

// CORS Policies
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true,
    optionsSuccessStatus: 200,
}
));

// Configuration Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("images"));


// Routes / APIs
app.use("/services", serviceRoutes);

// Connect to server
app.listen(process.env.PORT, (error) => {
    if (!error) {
        console.log(chalk.blue.bold(`Server Running On Port: ${process.env.PORT}`));
    } else {
        console.log(chalk.red.bold("Couldn't Connect To Server!"))
        console.error(`Error: ${error}`);
    }
});
databaseConnection();