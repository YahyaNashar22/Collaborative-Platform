import chalk from "chalk";

import Project from "../models/projectModel.js";


// Start a project
export const startProject = async (req, res) => {
    try {
        const { clientId, providerId, serviceId, amount, status } = req.body;
        const project = new Project({
            clientId,
            providerId,
            serviceId,
            amount,
            status
        });
        await project.save();
        console.log(chalk.green.bold(`Started new project between ${clientId} and ${providerId}`));

        return res.status(201).json({
            message: "Project Started Successfully",
            payload: project
        });
    } catch (error) {
        res.status(500).json({
            message: "Problem Starting Project",
            error: error.message
        });
    }
}