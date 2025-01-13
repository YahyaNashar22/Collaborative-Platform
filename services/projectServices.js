import chalk from "chalk";

import Project from "../models/projectModel.js";
import mongoose from "mongoose";


export const getProjectByIdService = async (id) => {
    try {
        const project = await Project.findById(id).populate("clientId").populate("providerId").populate("serviceId");
        console.log(chalk.yellow.bold(`project fetched by id --> ${project}`));
        return project;
    } catch (error) {
        console.log(chalk.red.bold("problem fetching project by id"));
        console.error(error);
        return null;
    }
}

export const getAllProjectsService = async ({ userId, serviceId, firstName, lastName, phone, name, status }) => {
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
                $match: {
                    $and: [
                        {
                            $and: [
                                {
                                    $or: [
                                        userId ? { "client._id": new mongoose.Types.ObjectId(userId) } : {},
                                        userId ? { "provider._id": new mongoose.Types.ObjectId(userId) } : {},
                                    ]
                                },
                                {
                                    $or: [
                                        firstName ? { "client.firstName": firstName } : {},
                                        firstName ? { "provider.firstName": firstName } : {},
                                    ]
                                },
                                {
                                    $or: [
                                        lastName ? { "client.lastName": lastName } : {},
                                        lastName ? { "provider.lastName": lastName } : {},
                                    ]
                                },
                                {
                                    $or: [
                                        phone ? { "client.phone": phone } : {},
                                        phone ? { "provider.phone": phone } : {},
                                    ]
                                }
                            ]

                        },

                        serviceId ? { "serviceId": new mongoose.Types.ObjectId(serviceId) } : {},
                        name ? { "serviceDetails.name": name } : {},
                        status ? { "status": status } : {}
                    ]
                }
            },
            {
                $sort: { createdAt: -1 }
            }
        ]


        const projects = await Project.aggregate(pipeline);
        console.log(chalk.yellow.bold(`projects fetched successfully`));
        return projects;
    } catch (error) {
        console.log(chalk.red.bold("problem fetching projects"));
        console.error(error);
        return [];
    }
}