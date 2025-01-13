import chalk from "chalk";

import Project from "../models/projectModel.js";
import { getAllClientProjectsService, getAllProjectsService, getAllProviderProjectsService, getProjectByIdService } from "../services/projectServices.js";
import removeFile from "../utils/removeFile.js";

// Start a project
export const startProject = async (req, res) => {
    try {
        const { clientId, providerId, serviceId, amount, stages, timelines, availableHours } = req.body;

        const project = new Project({
            clientId,
            providerId,
            serviceId,
            amount,
            stages,
            timelines,
            availableHours
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

        const completedProject = await Project.findByIdAndUpdate(id, { status: "completed" }, { new: true, runValidators: true });

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

// Change Project Stage
export const changeProjectStage = async (req, res) => {
    try {
        const id = req.params.id;
        const { stage } = req.body;

        // get projects
        const project = await getProjectByIdService(id);
        if (!project) return res.status(404).json({ message: "Project Not Found!" });

        if (!project.stages.includes(stage)) return res.status(401).json({ message: `${stage} is not part of the project stages!` });

        const updatedTimelineIndex = project.stages.indexOf(stage);

        const updatedProject = await Project.findByIdAndUpdate(id, { $set: { stage, currentTimeLine: project.timelines[updatedTimelineIndex] } }, { new: true });

        console.log(chalk.yellow.bold(`Project ${project} Stage Change to ${stage}`));

        return res.status(200).json({
            message: `Project Stage Changed To ${stage} Successfully`,
            payload: updatedProject
        });
    } catch (error) {
        res.status(500).json({
            message: "Problem Changing Project Stage",
            error: error.message
        });
    }
}

// Request Files -- provider requests files from client
export const requestFiles = async (req, res) => {
    try {
        const id = req.params.id;

        // get project
        const project = await getProjectByIdService(id);
        if (!project) return res.status(404).json({ message: "Project Not Found!" });

        if (project.isRequestedFiles) return res.status(400).json({ message: "Files already requested" });

        await Project.findByIdAndUpdate(id, { $set: { isRequestedFiles: true } }, { new: true });

        res.status(200).json({ message: "Files Requested Successfully" });

    } catch (error) {
        res.status(500).json({
            message: "Problem Requesting Files",
            error: error.message
        });
    }
}

// Upload Files -- client uploads files
export const uploadFiles = async (req, res) => {
    try {
        const id = req.params.id;
        const projectFiles = req.file?.filename;

        // get project
        const project = await getProjectByIdService(id);
        if (!project) return res.status(404).json({ message: "Project Not Found!" });

        if (project.isUploadedFiles) return res.status(400).json({ message: "Files already uploaded" });

        await Project.findByIdAndUpdate(id, { $set: { isUploadedFiles: true, projectFiles } }, { new: true });

        res.status(200).json({ message: "Files Uploaded Successfully" });

    } catch (error) {
        res.status(500).json({
            message: "Problem Uploading Files",
            error: error.message
        });
    }
}

// Delete Files
export const deleteFiles = async (req, res) => {
    try {
        const id = req.params.id;

        // get project
        const project = await getProjectByIdService(id);
        if (!project) return res.status(404).json({ message: "Project Not Found!" });

        if (!project.isUploadedFiles) return res.status(400).json({ message: "Files haven't been uploaded" });

        if (project.projectFiles) removeFile(project.projectFiles);

        await Project.findByIdAndUpdate(id, { $set: { isUploadedFiles: false } }, { new: true });

        res.status(200).json({ message: "Files Deleted Successfully" });

    } catch (error) {
        res.status(500).json({
            message: "Problem Deleting Files",
            error: error.message
        });
    }
}

// Send Project Ticket -- sent from client or provider to admin
// used to send any additional inquiry, remark, complaints
export const sendProjectTicket = async (req, res) => {
    try {
        const id = req.params.id;
        const { subject, body } = req.body;

        // get project
        const project = await getProjectByIdService(id);
        if (!project) return res.status(404).json({ message: "Project Not Found!" });

        // TODO: Add Ticket Template Here ( email )

        res.status(200).json({ message: "Ticket Sent Successfully " });

    } catch (error) {
        res.status(500).json({
            message: "Problem Sending Ticket",
            error: error.message
        });
    }
}

// Request Project Meeting
export const requestProjectMeeting = async (req, res) => {
    try {
        const id = req.params.id;
        const { selectedTime } = req.body;

        // get project
        const project = await getProjectByIdService(id);
        if (!project) return res.status(404).json({ message: "Project Not Found!" });

        // TODO: Add Request Meeting Template Here ( email )

        res.status(200).json({ message: "Meeting Requested Successfully " });

    } catch (error) {
        res.status(500).json({
            message: "Problem Requesting Meeting",
            error: error.message
        });
    }
}

// Fetch All Projects -- admin
export const getAllProjects = async (req, res) => {
    try {
        const { userId, serviceId, firstName, lastName, phone, name, status } = req.body;
        const projects = await getAllProjectsService({ userId, serviceId, firstName, lastName, phone, name, status });

        if (!projects || projects.length == 0) return res.status(404).json({ message: "No Projects Found!" });

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

// Fetch All Projects -- client
export const getAllClientProjects = async (req, res) => {
    try {
        const { userId, serviceId, firstName, lastName, phone, name, status } = req.body;

        if (!userId) return res.status(401).json({ message: "userId must be provided" });

        const projects = await getAllClientProjectsService({ userId, serviceId, firstName, lastName, phone, name, status });

        if (!projects || projects.length == 0) return res.status(404).json({ message: "No Projects Found!" });

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

// Fetch All Projects -- providers
export const getAllProviderProjects = async (req, res) => {
    try {
        const { userId, serviceId, firstName, lastName, phone, name, status } = req.body;

        if (!userId) return res.status(401).json({ message: "userId must be provided" });

        const projects = await getAllProviderProjectsService({ userId, serviceId, firstName, lastName, phone, name, status });

        if (!projects || projects.length == 0) return res.status(404).json({ message: "No Projects Found!" });

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

// Get Single Project By Id
export const getProjectById = async (req, res) => {
    try {
        const id = req.params.id;

        const project = await getProjectByIdService(id);

        if (!project) return res.status(404).json({ message: "Project Not Found!" });

        return res.status(200).json({ message: "Project Fetched Successfully", payload: project });
    } catch (error) {
        res.status(500).json({
            message: "Problem Fetching Project",
            error: error.message
        });
    }
}

// Delete Project
export const deleteProject = async (req, res) => {
    try {
        const id = req.params.id;

        const project = await getProjectByIdService(id);

        if (!project) return res.status(404).json({ message: "Project does not exist" });

        if (project && project.projectFiles) removeFile(project.projectFiles);

        const deletedProject = await Project.findByIdAndDelete(id);

        return res.status(200).json({
            message: "Project Deleted Successfully",
            payload: deletedProject
        });
    } catch (error) {
        res.status(500).json({
            message: "Problem Deleting Project",
            error: error.message
        });
    }
}



// TODO: Add Payment Integration -- pay button for client ( pays admin ) -- pay button for admin ( pays provider )