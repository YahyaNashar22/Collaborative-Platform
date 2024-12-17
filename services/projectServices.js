import chalk from "chalk";

import Project from "../models/projectModel.js";


export const getProjectByIdService = async (id) => {
    try {
        const project = await Project.findById(id);
        console.log(chalk.yellow.bold(`project fetched by id --> ${project}`));
        return project;
    } catch (error) {
        console.log(chalk.red.bold("problem fetching project by id"));
        console.error(error);
        return null;
    }
}

export const getAllProjectsService = async ({ clientId, providerId, status }) => {
    try {
        const query = {};

        if (status) query.status = status;
        if (clientId) query.clientId = clientId;
        if (providerId) query.providerId = providerId;

        const projects = await Project.find(query);
        console.log(chalk.yellow.bold(`projects fetched successfully`));
        return projects;
    } catch (error) {
        console.log(chalk.red.bold("problem fetching projects"));
        console.error(error);
        return [];
    }
}