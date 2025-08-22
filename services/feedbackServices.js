import chalk from "chalk";
import Feedback from "../models/feedbackModel.js";

export const getAllFeedbacksService = async ({ projectId, userId }) => {
  try {
    const query = {};

    if (projectId) query.projectId = projectId;
    if (userId) query.userId = userId;

    const feedbacks = await Feedback.find(query).sort({ createdAt: -1 });
    if (!feedbacks) {
      console.log(chalk.yellow.bold("No Feedbacks Found"));
      return [];
    }

    console.log(chalk.yellow.bold("Feedbacks Found"));
    return feedbacks;
  } catch (error) {
    console.log(chalk.red.bold("Failed To Fetch Feedbacks"));
    console.error(error);
    return null;
  }
};

export const getSingleFeedbackService = async (id) => {
  try {
    const feedback = await Feedback.findOne({ projectId: id });

    if (!feedback) {
      console.log(chalk.yellow.bold(`Feedback Not Found For Id ${id}`));
      return null;
    }

    console.log(chalk.yellow.bold(`Feedback ${id} Found`));
    return feedback;
  } catch (error) {
    console.log(chalk.red.bold("Failed To Fetch Feedback"));
    console.error(error);
    return null;
  }
};
