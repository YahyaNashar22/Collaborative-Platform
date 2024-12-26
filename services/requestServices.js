import chalk from "chalk";

import Request from "../models/requestModel.js";

// TODO: ADD NECESSARY SERVICES

// Create request
export const createRequestService = async ({ clientId, serviceId }) => {
    try {
        const request = new Request({
            clientId, serviceId
        });
        await request.save();

        console.log(chalk.green.bold(`request ${request._id} created successfully`));
        return request;
    } catch (error) {
        console.log(chalk.red.bold("Failed To Create Request!"));
        console.error(error);
    }
}


// Get All Requests
export const getAllRequestsService = async () => {
    try {
        const requests = await Request.find({});

        if (!requests) {
            console.log(chalk.yellow.bold("No requests found"));
            return [];
        }

        console.log(chalk.yellow.bold("Requests found!"));
        return requests;

    } catch (error) {
        console.log(chalk.red.bold("Failed To Fetch Requests!"));
        console.error(error);
    }
}