import chalk from "chalk";

import Project from "../models/projectModel.js";
import {
  getAllClientProjectsService,
  getAllProjectsService,
  getAllProviderProjectsService,
  getProjectByIdService,
  markProjectAsCompletedService,
  updateProjectStages,
} from "../services/projectServices.js";
import removeFile from "../utils/removeFile.js";
import {
  sendFilesRequestedEmail,
  requestMeetingTemplate,
} from "../utils/emailTemplates.js";
import User from "../models/userModel.js";
import transporter from "../utils/nodemailerTransporter.js";

// Start a project
export const startProject = async (req, res) => {
  try {
    const {
      clientId,
      providerId,
      serviceId,
      amount,
      stages,
      timelines,
      availableHours,
    } = req.body;

    const project = new Project({
      clientId,
      providerId,
      serviceId,
      amount,
      stages,
      timelines,
      availableHours,
    });
    await project.save();
    console.log(
      chalk.green.bold(
        `Started new project between ${clientId} and ${providerId}`
      )
    );

    return res.status(201).json({
      message: "Project Started Successfully",
      payload: project,
    });
  } catch (error) {
    res.status(500).json({
      message: "Problem Starting Project",
      error: error.message,
    });
  }
};

// Mark Project As Completed
// export const markProjectAsCompleted = async (req, res) => {
//   try {
//     const id = req.params.id;

//     const project = await getProjectByIdService(id);
//     if (!project)
//       return res.status(404).json({ message: "Project Not Found!" });

//     const completedProject = await Project.findByIdAndUpdate(
//       id,
//       { status: "completed" },
//       { new: true, runValidators: true }
//     );

//     console.log(chalk.yellow.bold(`Project ${project} Marked As Completed`));

//     return res.status(200).json({
//       message: "Project Marked as Completed Successfully",
//       payload: completedProject,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Problem Marking Project As Completed",
//       error: error.message,
//     });
//   }
// };

// Change Project Stage
export const changeProjectStage = async (req, res) => {
  try {
    const id = req.params.id;
    const { stage } = req.body;

    // get projects
    const project = await getProjectByIdService(id);
    if (!project)
      return res.status(404).json({ message: "Project Not Found!" });

    if (!project.stages.includes(stage))
      return res
        .status(401)
        .json({ message: `${stage} is not part of the project stages!` });

    const updatedTimelineIndex = project.stages.indexOf(stage);

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      {
        $set: {
          stage,
          currentTimeLine: project.timelines[updatedTimelineIndex],
        },
      },
      { new: true }
    );

    console.log(
      chalk.yellow.bold(`Project ${project} Stage Change to ${stage}`)
    );

    return res.status(200).json({
      message: `Project Stage Changed To ${stage} Successfully`,
      payload: updatedProject,
    });
  } catch (error) {
    res.status(500).json({
      message: "Problem Changing Project Stage",
      error: error.message,
    });
  }
};

// Request Files -- provider requests files from client
export const requestFiles = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, description } = req.body;
    const user = req.user;

    const project = await getProjectByIdService(id);
    if (!project)
      return res.status(404).json({ message: "Project Not Found!" });

    const client = await User.findById(project.clientId);
    const provider = await User.findById(project.providerId);

    if (!client || !provider)
      return res.status(404).json({ message: "Client or Provider Not Found!" });

    let receiverUser;
    if (user._id.toString() === client._id.toString()) {
      receiverUser = provider;
    } else if (user._id.toString() === provider._id.toString()) {
      receiverUser = client;
    } else {
      return res
        .status(403)
        .json({ message: "User not authorized for this project" });
    }

    if (project.isRequestedFiles)
      return res.status(400).json({ message: "Files already requested" });

    // Send email

    await sendFilesRequestedEmail({
      receiverEmail: receiverUser.email,
      projectName: project.title,
      title: title || "Please upload project files",
      description:
        description || "We need the final design files for approval.",
      client: {
        name: `${client.firstName} ${client.lastName}`,
        email: client.email,
        phone: client.phone,
      },
      provider: {
        name: `${provider.firstName} ${provider.lastName}`,
        email: provider.email,
        phone: provider.phone,
      },
    });

    // Update flag
    await Project.findByIdAndUpdate(
      id,
      { $set: { isRequestedFiles: true } },
      { new: true }
    );

    res.status(200).json({
      message: "Files Requested & Email Sent Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Problem Requesting Files",
      error: error.message,
    });
  }
};

// Upload Files -- client uploads files
export const uploadFiles = async (req, res) => {
  try {
    const { id, stageId } = req.params;
    const uploadedFiles = req.files?.map((file) => file.filename) || [];

    // get project
    const project = await getProjectByIdService(id);
    if (!project)
      return res.status(404).json({ message: "Project Not Found!" });

    // get stage
    const stage = project.stages.id(stageId);
    if (!stage) {
      return res.status(404).json({ message: "Stage Not Found!" });
    }

    stage.isUploadedFiles = true;
    stage.projectFiles = [...(stage.projectFiles || []), ...uploadedFiles];
    await project.save();

    res
      .status(200)
      .json({ message: "Files Uploaded Successfully", stage: stage });
  } catch (error) {
    res.status(500).json({
      message: "Problem Uploading Files",
      error: error.message,
    });
  }
};

// Delete Files
export const deleteFiles = async (req, res) => {
  try {
    const id = req.params.id;

    // get project
    const project = await getProjectByIdService(id);
    if (!project)
      return res.status(404).json({ message: "Project Not Found!" });

    if (!project.isUploadedFiles)
      return res.status(400).json({ message: "Files haven't been uploaded" });

    if (project.projectFiles) removeFile(project.projectFiles);

    await Project.findByIdAndUpdate(
      id,
      { $set: { isUploadedFiles: false } },
      { new: true }
    );

    res.status(200).json({ message: "Files Deleted Successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Problem Deleting Files",
      error: error.message,
    });
  }
};

// Send Project Ticket -- sent from client or provider to admin
// used to send any additional inquiry, remark, complaints
export const sendProjectTicket = async (req, res) => {
  try {
    const id = req.params.id;
    const { subject, body } = req.body;

    // get project
    const project = await getProjectByIdService(id);
    if (!project)
      return res.status(404).json({ message: "Project Not Found!" });

    // TODO: Add Ticket Template Here ( email )

    res.status(200).json({ message: "Ticket Sent Successfully " });
  } catch (error) {
    res.status(500).json({
      message: "Problem Sending Ticket",
      error: error.message,
    });
  }
};

export const requestProjectMeeting = async (req, res) => {
  try {
    const id = req.params.id;
    const { meetingLink } = req.body;

    const project = await getProjectByIdService(id);
    if (!project)
      return res.status(404).json({ message: "Project Not Found!" });

    const client = project.clientId;
    const provider = project.providerId;

    if (!client || !provider)
      return res
        .status(400)
        .json({ message: "Missing client or provider information." });

    // Format email content
    const emailHtml = requestMeetingTemplate({
      client,
      provider,
      projectName: project.title,
      meetingTime: new Date(),
      meetingLink,
    });

    const emailsToSend = [client.email, provider.email];
    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: emailsToSend,
      subject: "📅 New Meeting Request – Collaborative Platform",
      html: emailHtml,
    });

    res.status(200).json({ message: "Meeting Requested Successfully" });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({
      message: "Problem Requesting Meeting",
      error: error.message,
    });
  }
};

// Fetch All Projects -- admin
export const getAllProjects = async (req, res) => {
  try {
    const { userId, serviceId, firstName, lastName, phone, name, status } =
      req.body;
    const projects = await getAllProjectsService({
      userId,
      serviceId,
      firstName,
      lastName,
      phone,
      name,
      status,
    });

    if (!projects || projects.length == 0)
      return res.status(404).json({ message: "No Projects Found!" });

    return res.status(200).json({
      message: "Projects fetched successfully",
      payload: projects,
    });
  } catch (error) {
    res.status(500).json({
      message: "Problem Fetching Projects",
      error: error.message,
    });
  }
};

// Fetch All Projects -- client
export const getAllClientProjects = async (req, res) => {
  try {
    const { userId, serviceId, firstName, lastName, phone, name, status } =
      req.body;

    if (!userId)
      return res.status(401).json({ message: "userId must be provided" });

    const projects = await getAllClientProjectsService({
      userId,
      serviceId,
      firstName,
      lastName,
      phone,
      name,
      status,
    });

    if (!projects || projects.length == 0)
      return res.status(404).json({ message: "No Projects Found!" });

    return res.status(200).json({
      message: "Projects fetched successfully",
      payload: projects,
    });
  } catch (error) {
    res.status(500).json({
      message: "Problem Fetching Projects",
      error: error.message,
    });
  }
};

// Fetch All Projects -- providers
export const getAllProviderProjects = async (req, res) => {
  try {
    const { userId, serviceId, firstName, lastName, phone, name, status } =
      req.body;

    if (!userId)
      return res.status(401).json({ message: "userId must be provided" });

    const projects = await getAllProviderProjectsService({
      userId,
      serviceId,
      firstName,
      lastName,
      phone,
      name,
      status,
    });

    if (!projects || projects.length == 0)
      return res.status(404).json({ message: "No Projects Found!" });

    return res.status(200).json({
      message: "Projects fetched successfully",
      payload: projects,
    });
  } catch (error) {
    res.status(500).json({
      message: "Problem Fetching Projects",
      error: error.message,
    });
  }
};

// Get Single Project By Id
export const getProjectById = async (req, res) => {
  try {
    const id = req.params.id;

    const project = await getProjectByIdService(id);

    if (!project)
      return res.status(404).json({ message: "Project Not Found!" });

    return res
      .status(200)
      .json({ message: "Project Fetched Successfully", payload: project });
  } catch (error) {
    res.status(500).json({
      message: "Problem Fetching Project",
      error: error.message,
    });
  }
};

// Delete Project
export const deleteProject = async (req, res) => {
  try {
    const id = req.params.id;

    const project = await getProjectByIdService(id);

    if (!project)
      return res.status(404).json({ message: "Project does not exist" });

    if (project && project.projectFiles) removeFile(project.projectFiles);

    const deletedProject = await Project.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Project Deleted Successfully",
      payload: deletedProject,
    });
  } catch (error) {
    res.status(500).json({
      message: "Problem Deleting Project",
      error: error.message,
    });
  }
};

export const createStage = async (req, res) => {
  try {
    const { projectId } = req.params;

    const {
      name,
      description,
      isUploadedFiles,
      projectFiles,
      start,
      end,
      status,
    } = req.body;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({
        message: "Project Not Found",
      });
    }

    const newStage = {
      name,
      description,
      isUploadedFiles,
      projectFiles,
      start,
      end,
      status,
    };

    project.stages.push(newStage);

    await project.save();

    return res.status(201).json({
      message: "Stage created successfully",
      stage: newStage,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Problem Ceating Stage",
      error: error.message,
    });
  }
};

export const updateStages = async (req, res) => {
  try {
    const { projectId } = req.params;
    const updatedStages = req.body;

    const updated = await updateProjectStages(projectId, updatedStages);

    return res.status(200).json({
      message: "All stages updated successfully",
      stages: updated,
    });
  } catch (error) {
    const isClientError =
      error.message === "Project not found" ||
      error.message === "Invalid stages format. Must be an array.";

    return res.status(isClientError ? 400 : 500).json({
      message: "Problem updating stages",
      error: error.message,
    });
  }
};

export const deleteStage = async (req, res) => {
  try {
    const { projectId, stageId } = req.params;

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({
        message: "Project Not Found",
      });
    }

    const stage = project.stages.id(stageId);
    if (!stage) {
      return res.status(404).json({
        message: "Stage Not Found",
      });
    }

    stage.remove();

    await project.save();

    return res.status(200).json({
      message: "Stage deleted successfully",
      stage,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Problem Deleting Stage",
      error: error.message,
    });
  }
};

export const markProjectAsCompleted = async (req, res) => {
  try {
    const { projectId, stageId } = req.params;

    const updatedStages = await markProjectAsCompletedService(
      projectId,
      stageId
    );

    return res.status(200).json({
      message: "Stage updated successfully",
      stages: updatedStages,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Error updating stage",
    });
  }
};

// TODO: Add Payment Integration -- pay button for client ( pays admin ) -- pay button for admin ( pays provider )

// TODO: Add reminder logic
