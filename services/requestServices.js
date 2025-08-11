import chalk from "chalk";

import Request from "../models/requestModel.js";
import mongoose from "mongoose";
import Service from "../models/serviceModel.js";
import User from "../models/userModel.js";
import Quotation from "../models/quotationModel.js";
import Project from "../models/projectModel.js";
import res from "express/lib/response.js";

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
        $set: {
          interestedBy: {
            $map: {
              input: "$interestedBy",
              as: "id",
              in: { $toString: "$$id" },
            },
          },
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
export const getProvidersForRequest = async (requestId, query) => {
  const request = await Request.findById(requestId).select("providerId");

  if (!request) {
    throw new Error("Request not found");
  }

  const assignedProviderIds = request.providerId || [];

  const serviceId = new mongoose.Types.ObjectId(query);

  const filterBy = {
    role: "provider",
    services: serviceId,
  };

  //  Get assigned providers
  const assigned = await User.find({
    _id: { $in: assignedProviderIds },
    ...filterBy,
  }).select("_id firstName lastName email phone profilePicture");

  //  Get unassigned providers
  const unassigned = await User.find({
    _id: { $nin: assignedProviderIds },
    ...filterBy,
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

export const generateStagesAndTimelines = (estimatedDeadline) => {
  const stageNames = [
    "Mobilization",
    "Discovery",
    "Design",
    "Execution",
    "Reporting and Feedback",
  ];

  const start = new Date();
  const end = new Date(estimatedDeadline);

  const totalDays = Math.ceil(
    (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
  );

  const stages = [];
  const timelines = [];
  let current = new Date(start);

  if (totalDays <= 0) {
    for (let i = 0; i < stageNames.length; i++) {
      stages.push({
        name: stageNames[i],
        start: new Date(),
        isUploadedFiles: false,
        projectFiles: "",
        end: new Date(),
        status: i === 0 ? "in_progress" : "not_started",
      });
      timelines.push(`Stage ${i + 1}`);
    }

    return { stages, timelines };
  }

  const useFakeWeeks = totalDays <= 5;
  const effectiveDays = useFakeWeeks ? totalDays * 4 : totalDays;
  const daysPerStage = Math.floor(effectiveDays / stageNames.length);
  const remainder = effectiveDays % stageNames.length;

  for (let i = 0; i < stageNames.length; i++) {
    const extraDay = i < remainder ? 1 : 0;
    const stageStart = new Date(current);
    const stageEnd = new Date(stageStart);
    stageEnd.setDate(stageEnd.getDate() + daysPerStage + extraDay - 1);

    stages.push({
      name: stageNames[i],
      start: stageStart,
      end: stageEnd,
      status: i === 0 ? "in_progress" : "not_started",
    });

    timelines.push(
      `${stageStart.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })} - ${stageEnd.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })}`
    );

    current.setDate(stageEnd.getDate() + 1);
  }

  return { stages, timelines };
};

export const getRequestsForDashboardService = async (userData) => {
  const response = {};

  if (userData.role === "admin") {
    const allRequests = await Request.find({});
    if (!allRequests) throw new Error("No Request Found!");

    // Basic counts
    response.requestNb = allRequests.length;
    response.completedRequest = await Request.countDocuments({
      status: "accepted",
    });
    response.canceledRequest = await Request.countDocuments({
      status: "canceled",
    });
    response.pendingRequest = await Request.countDocuments({
      status: { $nin: ["accepted", "canceled"] },
    });

    // Budget calculation
    response.totalBudget = allRequests.reduce(
      (sum, req) => sum + (req.budget || 0),
      0
    );

    // Total quotations
    response.totalQuotations = await Quotation.countDocuments({});

    // Stage counts
    const stageAggregation = await Request.aggregate([
      {
        $group: {
          _id: "$stage",
          count: { $sum: 1 },
        },
      },
    ]);

    response.totalRequestStages = {
      stage1: 0,
      stage2: 0,
      stage3: 0,
      stage4: 0,
    };

    stageAggregation.forEach((item) => {
      if (item._id === 1) response.totalRequestStages.stage1 = item.count;
      if (item._id === 2) response.totalRequestStages.stage2 = item.count;
      if (item._id === 3) response.totalRequestStages.stage3 = item.count;
      if (item._id === 4) response.totalRequestStages.stage4 = item.count;
    });

    // Files uploaded by extension
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    response.fileUploadedByMonth = await Request.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfMonth, $lt: endOfMonth },
          document: { $exists: true, $type: "string", $ne: "" },
        },
      },
      {
        $project: {
          extension: {
            $let: {
              vars: { dotIndex: { $indexOfBytes: ["$document", "."] } },
              in: {
                $cond: [
                  { $gte: ["$$dotIndex", 0] },
                  {
                    $substrBytes: [
                      "$document",
                      { $add: ["$$dotIndex", 1] },
                      -1,
                    ],
                  },
                  "",
                ],
              },
            },
          },
        },
      },
      { $match: { extension: { $ne: "" } } },
      {
        $group: {
          _id: "$extension",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          type: "$_id",
          count: 1,
        },
      },
    ]);

    // Total projects
    response.totalProjects = await Project.countDocuments({});

    response.totalProjectStatus = await Project.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    response.projectsCreatedByDay = await Project.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startOfMonth,
            $lt: endOfMonth,
          },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 },
      },
      {
        $project: {
          _id: 0,
          year: "$_id.year",
          month: "$_id.month",
          day: "$_id.day",
          count: 1,
        },
      },
    ]);
  } else if (userData.role === "client") {
    const allRequests = await Request.find({ clientId: userData._id });
    if (!allRequests || allRequests.length === 0)
      throw new Error("No Request Found!");

    response.requestNb = allRequests.length;

    response.completedRequest = allRequests.filter(
      (req) => req.status === "accepted"
    ).length;
    response.canceledRequest = allRequests.filter(
      (req) => req.status === "canceled"
    ).length;
    response.pendingRequest = allRequests.filter(
      (req) => !["accepted", "canceled"].includes(req.status)
    ).length;

    response.totalBudget = allRequests.reduce(
      (sum, req) => sum + (req.budget || 0),
      0
    );

    const requestIds = allRequests.map((req) => req._id);

    const allQuotations = await Quotation.find({
      requestId: { $in: requestIds },
    });

    response.totalQuotations = allQuotations.length;

    const stageAggregation = await Request.aggregate([
      {
        $match: {
          clientId: new mongoose.Types.ObjectId(userData._id),
        },
      },
      {
        $group: {
          _id: "$stage",
          count: { $sum: 1 },
        },
      },
    ]);

    response.totalRequestStages = {
      stage1: 0,
      stage2: 0,
      stage3: 0,
      stage4: 0,
    };

    stageAggregation.forEach((item) => {
      if (item._id === 1) response.totalRequestStages.stage1 = item.count;
      if (item._id === 2) response.totalRequestStages.stage2 = item.count;
      if (item._id === 3) response.totalRequestStages.stage3 = item.count;
      if (item._id === 4) response.totalRequestStages.stage4 = item.count;
    });

    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    response.fileUploadedByMonth = await Request.aggregate([
      {
        $match: {
          clientId: new mongoose.Types.ObjectId(userData._id),
          createdAt: { $gte: startOfMonth, $lt: endOfMonth },
          document: { $exists: true, $type: "string", $ne: "" },
        },
      },
      {
        $project: {
          extension: {
            $let: {
              vars: { dotIndex: { $indexOfBytes: ["$document", "."] } },
              in: {
                $cond: [
                  { $gte: ["$$dotIndex", 0] },
                  {
                    $substrBytes: [
                      "$document",
                      { $add: ["$$dotIndex", 1] },
                      -1,
                    ],
                  },
                  "",
                ],
              },
            },
          },
        },
      },
      { $match: { extension: { $ne: "" } } },
      {
        $group: {
          _id: "$extension",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          type: "$_id",
          count: 1,
        },
      },
    ]);

    response.totalProjectStatus = await Project.aggregate([
      {
        $match: {
          clientId: new mongoose.Types.ObjectId(userData._id),
        },
      },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    response.projectsCreatedByDay = await Project.aggregate([
      {
        $match: {
          clientId: new mongoose.Types.ObjectId(userData._id),
          createdAt: {
            $gte: startOfMonth,
            $lt: endOfMonth,
          },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 },
      },
      {
        $project: {
          _id: 0,
          year: "$_id.year",
          month: "$_id.month",
          day: "$_id.day",
          count: 1,
        },
      },
    ]);
  } else {
    const providerId = userData._id;

    const allRequests = await Request.find({ providerId: providerId });
    response.requestNb = allRequests.length;

    const allQuotations = await Quotation.find({ providerId });
    response.quotationNb = allQuotations.length;

    const quotationRequestIds = allQuotations.map((q) => q.requestId);
    const relatedRequests = await Request.find({
      _id: { $in: quotationRequestIds },
    });

    response.totalRequestStages = {
      stage1: 0,
      stage2: 0,
      stage3: 0,
      stage4: 0,
    };
    relatedRequests.forEach((req) => {
      if (req.stage === 1) response.totalRequestStages.stage1++;
      else if (req.stage === 2) response.totalRequestStages.stage2++;
      else if (req.stage === 3) response.totalRequestStages.stage3++;
      else if (req.stage === 4) response.totalRequestStages.stage4++;
    });

    const wonQuotationIds = relatedRequests
      .map((r) => r.selectedQuotation?.toString())
      .filter(Boolean);

    response.wonQuotations = allQuotations.filter((q) =>
      wonQuotationIds.includes(q._id.toString())
    ).length;

    response.pendingQuotations = response.quotationNb - response.wonQuotations;

    const quotationsByDay = await Quotation.aggregate([
      { $match: { providerId: new mongoose.Types.ObjectId(providerId) } },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
            day: { $dayOfMonth: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          year: "$_id.year",
          month: "$_id.month",
          day: "$_id.day",
          count: 1,
        },
      },
      { $sort: { year: 1, month: 1, day: 1 } },
    ]);

    response.quotationsByDay = quotationsByDay;
  }

  return response;
};

export const interestBy = async (requestId, userId) => {
  try {
    const request = await Request.findById(requestId);

    if (!request) {
      throw new Error("Request not found");
    }

    const updatedRequest = await Request.findByIdAndUpdate(
      requestId,
      {
        $addToSet: { interestedBy: new mongoose.Types.ObjectId(userId) },
      },
      { new: true }
    );

    return updatedRequest;
  } catch (error) {
    throw error;
  }
};
