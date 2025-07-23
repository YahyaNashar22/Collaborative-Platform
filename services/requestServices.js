import chalk from "chalk";

import Request from "../models/requestModel.js";
import mongoose from "mongoose";
import Service from "../models/serviceModel.js";
import User from "../models/userModel.js";

// Create request
export const createRequestService = async ({
  clientId,
  serviceId,
  title,
  budget,
  offerDeadline,
  projectDeadline,
  description,
  document,
}) => {
  try {
    const request = new Request({
      clientId,
      serviceId,
      title,
      budget,
      offerDeadline: new Date(offerDeadline),
      projectDeadline: new Date(projectDeadline),
      description,
      document,
    });
    await request.save();

    const service = await Service.findById(serviceId)
      .select("name description")
      .lean();

    if (!service) {
      throw new Error("Service not found");
    }

    console.log(
      chalk.green.bold(`request ${request._id} created successfully`)
    );
    const result = {
      ...request.toObject(),
      serviceName: service.name,
      serviceDescription: service.description,
    };
    return {
      result,
    };
  } catch (error) {
    console.log(chalk.red.bold("Failed To Create Request!"));
    console.error(error);
    throw error;
  }
};

// add quotation to request
export const addQuotationToRequestService = async (requestId, quotationId) => {
  try {
    await Request.findByIdAndUpdate(requestId, {
      $addToSet: { quotations: quotationId },
    });
    console.log(
      chalk.green.bold(
        `Quotation ${quotationId} Added To Request ${requestId} Successfully`
      )
    );
  } catch (error) {
    console.log(chalk.red.bold("Failed To Add Quotation To Request!"));
    console.error(error);
  }
};

// change request stage
export const changeRequestStageService = async (requestId, stage, status) => {
  try {
    await Request.findByIdAndUpdate(
      requestId,
      { $set: { stage, status } },
      { runValidators: true }
    );
    console.log(
      chalk.yellow.bold(`Changed request ${requestId} stage to : ${stage}`)
    );
  } catch (error) {
    console.log(chalk.red.bold("Failed To Change Request Stage!"));
    console.error(error);
  }
};

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
};

// Get All Requests -- for admin
export const getAllRequestsService = async ({
  userId,
  serviceId,
  firstName,
  lastName,
  phone,
  name,
}) => {
  try {
    const pipeline = [
      {
        $lookup: {
          from: "users",
          localField: "clientId",
          foreignField: "_id",
          as: "client",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "providerId",
          foreignField: "_id",
          as: "provider",
        },
      },
      {
        $lookup: {
          from: "services",
          localField: "serviceId",
          foreignField: "_id",
          as: "serviceDetails",
        },
      },
      {
        $lookup: {
          from: "quotations",
          localField: "approvedQuotations",
          foreignField: "_id",
          as: "approvedQuotations",
        },
      },
      {
        $lookup: {
          from: "quotations",
          localField: "selectedQuotation",
          foreignField: "_id",
          as: "selectedQuotation",
        },
      },
      {
        $match: {
          $and: [
            {
              $and: [
                {
                  $or: [
                    userId
                      ? { "client._id": new mongoose.Types.ObjectId(userId) }
                      : {},
                    userId
                      ? { "provider._id": new mongoose.Types.ObjectId(userId) }
                      : {},
                  ],
                },
                {
                  $or: [
                    firstName ? { "client.firstName": firstName } : {},
                    firstName ? { "provider.firstName": firstName } : {},
                  ],
                },
                {
                  $or: [
                    lastName ? { "client.lastName": lastName } : {},
                    lastName ? { "provider.lastName": lastName } : {},
                  ],
                },
                {
                  $or: [
                    phone ? { "client.phone": phone } : {},
                    phone ? { "provider.phone": phone } : {},
                  ],
                },
              ],
            },
            serviceId
              ? { "serviceDetails._id": new mongoose.Types.ObjectId(serviceId) }
              : {},
            name ? { "serviceDetails.name": name } : {},
          ],
        },
      },
      {
        $sort: { createdAt: -1 },
      },
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
    throw error;
  }
};

// get all requests -- for client
export const getAllClientRequestsService = async ({
  userId,
  firstName,
  lastName,
  phone,
  name,
}) => {
  try {
    const pipeline = [
      {
        $lookup: {
          from: "users",
          localField: "providerId",
          foreignField: "_id",
          as: "provider",
        },
      },
      {
        $lookup: {
          from: "services",
          localField: "serviceId",
          foreignField: "_id",
          as: "serviceDetails",
        },
      },
      {
        $lookup: {
          from: "quotations",
          localField: "approvedQuotations",
          foreignField: "_id",
          as: "approvedQuotations",
        },
      },
      {
        $lookup: {
          from: "quotations",
          localField: "selectedQuotation",
          foreignField: "_id",
          as: "selectedQuotation",
        },
      },
      {
        $match: {
          $and: [
            userId ? { clientId: new mongoose.Types.ObjectId(userId) } : {},
            firstName ? { "provider.firstName": firstName } : {},
            lastName ? { "provider.lastName": lastName } : {},
            phone ? { "provider.phone": phone } : {},
            name ? { "serviceDetails.name": name } : {},
          ],
        },
      },
      {
        $sort: { createdAt: -1 },
      },
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
};

// get all requests -- for provider
export const getAllProviderRequestsService = async ({
  userId,
  firstName,
  lastName,
  phone,
  name,
}) => {
  try {
    const pipeline = [
      {
        $lookup: {
          from: "users",
          localField: "clientId",
          foreignField: "_id",
          as: "client",
        },
      },
      {
        $lookup: {
          from: "services",
          localField: "serviceId",
          foreignField: "_id",
          as: "serviceDetails",
        },
      },
      {
        $lookup: {
          from: "quotations",
          localField: "approvedQuotations",
          foreignField: "_id",
          as: "approvedQuotations",
        },
      },
      {
        $lookup: {
          from: "quotations",
          localField: "quotations",
          foreignField: "_id",
          as: "quotationsDetails",
        },
      },
      {
        $addFields: {
          providerIds: {
            $map: {
              input: "$quotationsDetails",
              as: "quotation",
              in: "$$quotation.providerId",
            },
          },
        },
      },
      {
        $lookup: {
          from: "quotations",
          localField: "selectedQuotation",
          foreignField: "_id",
          as: "selectedQuotation",
        },
      },
      {
        $match: {
          $and: [
            userId ? { providerId: new mongoose.Types.ObjectId(userId) } : {},
            firstName ? { "client.firstName": firstName } : {},
            lastName ? { "client.lastName": lastName } : {},
            phone ? { "client.phone": phone } : {},
            name ? { "serviceDetails.name": name } : {},
          ],
        },
      },
      {
        $project: {
          clientId: 0,
          providerId: 0,
          client: 0,
          quotationsDetails: 0,
        },
      },
      {
        $sort: { createdAt: -1 },
      },
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
};

// Get all providers that are not assign to specific request id
// helpfull when admin assign request to user
export const getProvidersForRequest = async (requestId) => {
  const request = await Request.findById(requestId).select("providerId");

  if (!request) {
    throw new Error("Request not found");
  }

  const assignedProviderIds = request.providerId || [];

  //  Get assigned providers
  const assigned = await User.find({
    _id: { $in: assignedProviderIds },
    role: "provider",
  }).select("_id firstName lastName email phone profilePicture");

  //  Get unassigned providers
  const unassigned = await User.find({
    _id: { $nin: assignedProviderIds },
    role: "provider",
  }).select("_id firstName lastName email phone profilePicture");

  //  map to { label, value } format for dropdowns
  const format = (users) =>
    users.map((user) => ({
      label: `${user.firstName} ${user.lastName}`,
      value: user._id,
    }));

  return {
    assigned: format(assigned),
    unassigned: format(unassigned),
  };
};
