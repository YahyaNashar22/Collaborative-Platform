import chalk from "chalk";
import Feedback from "../models/feedbackModel.js";
import { getAllFeedbacksService, getSingleFeedbackService } from "../services/feedbackServices.js";

// // Send Feedback form
// export const sendFeedback = async (req, res) => {
//     try {
//         const { projectId, userId, satisfactionAsPartnerCCC, professionalismOfTheCompany, technicalSupport, responsivenessToNeeds, serviceQuality, deliveryTime, performanceOfProvider, satisfactionWithProviderExpertise, expertiseKnowledge, addressedMyConcerns, clearCommunication, responsiveTimely, insightsRecommendation, HowStronglyRecommend, comparedToCompetitors, continueOurServices, customMessage } = req.body;

//         const feedback = new Feedback({ projectId, userId, satisfactionAsPartnerCCC, professionalismOfTheCompany, technicalSupport, responsivenessToNeeds, serviceQuality, deliveryTime, performanceOfProvider, satisfactionWithProviderExpertise, expertiseKnowledge, addressedMyConcerns, clearCommunication, responsiveTimely, insightsRecommendation, HowStronglyRecommend, comparedToCompetitors, continueOurServices, customMessage });

//         await feedback.save();

//         console.log(chalk.yellow.bold(`Feedback sent successfully from user ${userId} for project ${projectId}`));

//         return res.status(201).json({
//             message: "feedback sent successfully",
//             payload: feedback
//         });

//     } catch (error) {
//         res.status(500).json({
//             message: "Problem Sending Feedback",
//             error: error.message
//         });
//     }
// }

// // Get All Feedbacks
// // ? filter feedbacks by project or by user
// export const getAllFeedbacks = async (req, res) => {
//     try {
//         const { projectId, userId } = req.body;
//         const feedbacks = await getAllFeedbacksService({ projectId, userId });

//         if (!feedbacks || feedbacks.length == 0) return res.status(404).json({ message: "No Feedbacks found" });

//         return res.status(200).json({
//             message: "Feedbacks Fetched Successfully",
//             payload: feedbacks
//         })
//     } catch (error) {
//         res.status(500).json({
//             message: "Problem Fetching Feedbacks",
//             error: error.message
//         });
//     }
// }

// // Get Single Feedback By Id
// export const getSingleFeedback = async (req, res) => {
//     try {
//         const id = req.params.id;

//         const feedback = await getSingleFeedbackService(id);

//         if (!feedback) return res.status(404).json({ message: "Feedback does not exist" });

//         return res.status(200).json({
//             message: "Feedback fetched successfully",
//             payload: feedback,
//         });

//     } catch (error) {
//         res.status(500).json({
//             message: "Problem Fetching Feedback",
//             error: error.message
//         });
//     }
// }

// // Delete FeedBack
// export const deleteFeedback = async (req, res) => {
//     try {
//         const id = req.params.id;

//         const feedback = await getSingleFeedbackService(id);

//         if (!feedback) return res.status(404).json({ message: "Feedback does not exist" });

//         const deletedFeedback = await Feedback.findByIdAndDelete(id);

//         console.log(chalk.yellow.bold(`Feedback ${id} deleted successfully`));

//         return res.status(200).json({
//             message: "Feedback deleted successfully",
//             payload: deletedFeedback
//         });

//     } catch (error) {
//         res.status(500).json({
//             message: "Problem Deleting Feedback",
//             error: error.message
//         });
//     }
// }
