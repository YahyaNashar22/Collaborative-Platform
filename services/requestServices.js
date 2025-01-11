import chalk from "chalk";

import Request from "../models/requestModel.js";
import mongoose from "mongoose";

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
export const changeRequestStageService = async (requestId, stage, status) => {
    try {
        await Request.findByIdAndUpdate(requestId, { $set: { stage, status } }, { runValidators: true });
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


// Get All Requests -- for admin
export const getAllRequestsService = async ({ userId, serviceId, firstName, lastName, phone, name }) => {
    try {
        const pipeline = [
            {
                $lookup: {
                    from: "users",
                    localField: "clientId",
                    foreignField: "_id",
                    as: "client"
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "providerId",
                    foreignField: "_id",
                    as: "provider"
                }
            },
            {
                $lookup: {
                    from: "services",
                    localField: "serviceId",
                    foreignField: "_id",
                    as: "serviceDetails"
                }
            },
            {
                $lookup: {
                    from: "quotations",
                    localField: "approvedQuotations",
                    foreignField: "_id",
                    as: "approvedQuotations"
                }
            },
            {
                $lookup: {
                    from: "quotations",
                    localField: "selectedQuotation",
                    foreignField: "_id",
                    as: "selectedQuotation"
                }
            },
            {
                $match: {

                    $or: [
                        userId ? { "client._id": new mongoose.Types.ObjectId(userId) } : {},
                        userId ? { "provider._id": new mongoose.Types.ObjectId(userId) } : {},
                        serviceId ? { "serviceDetails._id": new mongoose.Types.ObjectId(serviceId) } : {},
                        firstName ? { "client.firstName": firstName } : {},
                        lastName ? { "client.lastName": lastName } : {},
                        phone ? { "client.phone": phone } : {},
                        firstName ? { "provider.firstName": firstName } : {},
                        lastName ? { "provider.lastName": lastName } : {},
                        phone ? { "provider.phone": phone } : {},
                        name ? { "service.name": name } : {}
                    ]
                }
            },
            {
                $sort: { createdAt: -1 }
            }
        ];
        const requests = await Request.aggregate(pipeline);

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

// get all requests -- for client
export const getAllClientRequestsService = async ({ userId, firstName, lastName, phone, name }) => {
    try {
        const pipeline = [
            {
                $lookup: {
                    from: "users",
                    localField: "clientId",
                    foreignField: "_id",
                    as: "client"
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "providerId",
                    foreignField: "_id",
                    as: "provider"
                }
            },
            {
                $lookup: {
                    from: "services",
                    localField: "serviceId",
                    foreignField: "_id",
                    as: "serviceDetails"
                }
            },
            {
                $lookup: {
                    from: "quotations",
                    localField: "approvedQuotations",
                    foreignField: "_id",
                    as: "approvedQuotations"
                }
            },
            {
                $lookup: {
                    from: "quotations",
                    localField: "selectedQuotation",
                    foreignField: "_id",
                    as: "selectedQuotation"
                }
            },
            {
                $match: {
                    $and: [
                        { "client._id": new mongoose.Types.ObjectId(userId) },
                        {
                            $or: [
                                firstName ? { "provider.firstName": firstName } : {},
                                lastName ? { "provider.lastName": lastName } : {},
                                phone ? { "provider.phone": phone } : {},
                                name ? { "service.name": name } : {}
                            ]
                        }
                    ]
                }
            },
            {
                $sort: { createdAt: -1 }
            }
        ];
        const requests = await Request.aggregate(pipeline);

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