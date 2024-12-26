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