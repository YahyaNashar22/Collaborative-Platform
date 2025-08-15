import chalk from "chalk";

import Project from "../models/projectModel.js";
import mongoose from "mongoose";

export const getProjectByIdService = async (id) => {
  try {
    const project = await Project.findById(id)
      .populate("clientId")
      .populate("providerId")
      .populate("serviceId");
    console.log(chalk.yellow.bold(`project fetched by id --> ${project}`));
    return project;
  } catch (error) {
    console.log(chalk.red.bold("problem fetching project by id"));
    console.error(error);
    return null;
  }
};

// get all projects service for admin
export const getAllProjectsService = async ({
  userId,
  serviceId,
  firstName,
  lastName,
  phone,
  name,
  status,
}) => {
  try {
    const pipeline = [
      {
        $addFields: {
          computedStatus: {
            $cond: {
              if: {
                $and: [
                  { $lte: ["$projectDeadline", new Date()] },
                  { $ne: ["$status", "completed"] },
                ],
              },
              then: "overdue",
              else: "$status",
            },
          },
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
              ? { serviceId: new mongoose.Types.ObjectId(serviceId) }
              : {},
            name ? { "serviceDetails.name": name } : {},
            status ? { computedStatus: status } : {},
          ],
        },
      },
      {
        $sort: { createdAt: -1 },
      },
    ];

    const projects = await Project.aggregate(pipeline);
    console.log(chalk.yellow.bold(`projects fetched successfully`));
    return projects;
  } catch (error) {
    console.log(chalk.red.bold("problem fetching projects"));
    console.error(error);
    return [];
  }
};

// get all projects service for client
export const getAllClientProjectsService = async ({
  userId,
  serviceId,
  firstName,
  lastName,
  phone,
  name,
  status,
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
        $match: {
          $and: [
            userId ? { clientId: new mongoose.Types.ObjectId(userId) } : {},
            firstName ? { "provider.firstName": firstName } : {},
            lastName ? { "provider.lastName": lastName } : {},
            phone ? { "provider.phone": phone } : {},
            serviceId
              ? { serviceId: new mongoose.Types.ObjectId(serviceId) }
              : {},
            name ? { "serviceDetails.name": name } : {},
            status ? { status: status } : {},
          ],
        },
      },
      {
        $sort: { createdAt: -1 },
      },
    ];

    const projects = await Project.aggregate(pipeline);
    console.log(chalk.yellow.bold(`projects fetched successfully`));
    return projects;
  } catch (error) {
    console.log(chalk.red.bold("problem fetching projects"));
    console.error(error);
    return [];
  }
};

// get all projects service for client
export const getAllProviderProjectsService = async ({
  userId,
  serviceId,
  firstName,
  lastName,
  phone,
  name,
  status,
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
        $match: {
          $and: [
            userId ? { providerId: new mongoose.Types.ObjectId(userId) } : {},
            firstName ? { "client.firstName": firstName } : {},
            lastName ? { "client.lastName": lastName } : {},
            phone ? { "client.phone": phone } : {},
            serviceId
              ? { serviceId: new mongoose.Types.ObjectId(serviceId) }
              : {},
            name ? { "serviceDetails.name": name } : {},
            status ? { status: status } : {},
          ],
        },
      },

      {
        $addFields: {
          allStagesCompleted: {
            $cond: {
              if: { $gt: [{ $size: "$stages" }, 0] },
              then: {
                $allElementsTrue: [
                  {
                    $map: {
                      input: "$stages",
                      as: "stage",
                      in: { $eq: ["$$stage.status", "completed"] },
                    },
                  },
                ],
              },
              else: false,
            },
          },
        },
      },
      {
        $addFields: {
          status: {
            $cond: {
              if: "$allStagesCompleted",
              then: "completed",
              else: "$status",
            },
          },
        },
      },
      {
        $sort: { createdAt: -1 },
      },
    ];

    const projects = await Project.aggregate(pipeline);
    console.log(chalk.yellow.bold(`projects fetched successfully`));
    return projects;
  } catch (error) {
    console.log(chalk.red.bold("problem fetching projects"));
    console.error(error);
    return [];
  }
};

export const updateProjectStages = async (projectId, updatedStages) => {
  if (!Array.isArray(updatedStages)) {
    throw new Error("Invalid stages format. Must be an array.");
  }

  const project = await Project.findById(projectId);
  if (!project) {
    throw new Error("Project not found");
  }

  // this to check if during configuration he set stage as confirm
  if (updatedStages.length > 1 && updatedStages[0].status === "completed") {
    updatedStages[1].status = "in_progress";
  }

  updatedStages.forEach((updatedStage) => {
    const stage = project.stages.id(updatedStage._id);
    if (stage) {
      Object.assign(stage, updatedStage);
    }
  });

  project.assignedStage = true;
  project.stages = updatedStages;
  await project.save();

  return project.stages;
};

export const markProjectAsCompletedService = async (projectId, stageId) => {
  const project = await Project.findById(projectId);
  if (!project) {
    throw new Error("Project Not Found");
  }

  const stages = project.stages;
  const stageIndex = stages.findIndex(
    (stage) => stage._id.toString() === stageId
  );

  if (stageIndex === -1) {
    throw new Error("Stage Not Found");
  }

  stages[stageIndex].status = "completed";

  const nextStage = stages[stageIndex + 1];
  if (nextStage && nextStage.status === "not_started") {
    nextStage.status = "in_progress";
  }

  await project.save();
  return project.stages;
};
