import mongoose from "mongoose";

const { Schema, model } = mongoose;

const ratingEnum = [1, 2, 3, 4, 5]

// TODO: ADD FEEDBACK VERSION FOR PROVIDER

const feedbackSchema = new Schema({
    projectId: {
        type: Schema.Types.ObjectId,
        ref: "Project",
        required: true
    },
    userId: {
        // client or provider id
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    // Overall, How satisfied are you with CCC as a consulting partner?
    satisfactionAsPartnerCCC: {
        type: Number,
        enum: ratingEnum,
        required: true
    },
    // Professionalism of the company
    professionalismOfTheCompany: {
        type: Number,
        enum: ratingEnum,
        required: true
    },
    // Technical support
    technicalSupport: {
        type: Number,
        enum: ratingEnum,
        required: true
    },
    // Responsiveness to the questions and needs
    responsivenessToNeeds: {
        type: Number,
        enum: ratingEnum,
        required: true
    },
    // Service quality
    serviceQuality: {
        type: Number,
        enum: ratingEnum,
        required: true
    },
    // Delivery time
    deliveryTime: {
        type: Number,
        enum: ratingEnum,
        required: true
    },
    // Performance of the service provider
    performanceOfProvider: {
        type: Number,
        enum: ratingEnum,
        required: true
    },
    // Overall, How satisfied are you with the expertise and professionalism of the service provider assigned to your project?
    satisfactionWithProviderExpertise: {
        type: Number,
        enum: ratingEnum,
        required: true
    },
    // Demonstrated a high level of expertise and knowledge
    expertiseKnowledge: {
        type: Number,
        enum: ratingEnum,
        required: true
    },
    // Effectively addressed my questions and concerns.
    addressedMyConcerns: {
        type: Number,
        enum: ratingEnum,
        required: true
    },
    // Communicated clearly and professionally.
    clearCommunication: {
        type: Number,
        enum: ratingEnum,
        required: true
    },
    // was responsive and timely in their communication.
    responsiveTimely: {
        type: Number,
        enum: ratingEnum,
        required: true
    },
    // Added value to our business through their insights and recommendations
    insightsRecommendation: {
        type: Number,
        enum: ratingEnum,
        required: true
    },
    // I would recommend it to my friends or colleagues.
    HowStronglyRecommend: {
        type: Number,
        enum: ratingEnum,
        required: true
    },
    // Compared to the competitors, our services is
    comparedToCompetitors: {
        type: Number,
        enum: ratingEnum,
        required: true
    },
    // How likely are you to continue to use our services
    continueOurServices: {
        type: Number,
        enum: ratingEnum,
        required: false
    },
    // Do you want to add or suggest something
    customMessage: {
        type: String,
        required: false
    }

}, {
    timestamps: true
});

const Feedback = model("Feedback", feedbackSchema);
export default Feedback;