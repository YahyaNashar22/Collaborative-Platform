import chalk from "chalk";

import Request from "../models/requestModel.js";

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

// add quotation to request
export const addQuotationToRequestService = async (requestId, quotationId) => {
    try {
        await Request.findByIdAndUpdate(requestId, { $addToSet: { quotations: quotationId } });
        console.log(chalk.green.bold(`Quotation ${quotationId} Added To Request ${requestId} Successfully`));
    } catch (error) {
        console.log(chalk.red.bold("Failed To Add Quotation To Request!"));
        console.error(error);
    }
}

// change request stage
export const changeRequestStageService = async (requestId, stage) => {
    try {
        await Request.findByIdAndUpdate(requestId, { $set: { stage } });
        console.log(chalk.yellow.bold(`Changed request ${requestId} stage to : ${stage}`));
    } catch (error) {
        console.log(chalk.red.bold("Failed To Change Request Stage!"));
        console.error(error);
    }
}

// Get Request By id
export const getRequestByIdService = async (id) => {
    try {
        const request = await Request.findById(id);

        if (!request) {
            console.log(chalk.red.bold("Request Not Found!"));
            return null;
        }
        return request;
    } catch (error) {
        console.log(chalk.red.bold("Failed To Get Request!"));
        console.error(error);
    }
}


// Get All Requests
export const getAllRequestsService = async () => {
    try {
        const requests = await Request.find({}).populate("providerId").populate("quotations").populate("approvedQuotations").sort({ createdAt: -1 });

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