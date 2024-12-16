import chalk from "chalk";

import Project from "../models/projectModel.js";
import { getAllProjectsService, getProjectByIdService } from "../services/projectServices.js";


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

// Mark Project As Completed
export const markProjectAsCompleted = async (req, res) => {
    try {
        const id = req.params.id;

        const project = await getProjectByIdService(id);
        if (!project) return res.status(404).json({ message: "Project Not Found!" });

        const completedProject = await Project.findByIdAndUpdate(id, { status: "completed" }, { new: true });

        console.log(chalk.yellow.bold(`Project ${project} Marked As Completed`));

        return res.status(200).json({
            message: "Project Marked as Completed Successfully",
            payload: completedProject
        });
    } catch (error) {
        res.status(500).json({
            message: "Problem Marking Project As Completed",
            error: error.message
        });
    }
}

// Fetch All Projects
export const getAllProjects = async (req, res) => {
    try {
        const projects = await getAllProjectsService();
        if (!projects) return res.status(404).json({ message: "No Projects Found!" });

        return res.status(200).json({
            message: "Projects fetched successfully",
            payload: projects
        });
    } catch (error) {
        res.status(500).json({
            message: "Problem Fetching Projects",
            error: error.message
        });
    }
}