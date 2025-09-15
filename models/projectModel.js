import mongoose from "mongoose";

const { Schema, model } = mongoose;

const projectSchema = new Schema(
  {
    clientId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    providerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    serviceId: {
      type: Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    projectFiles: {
      type: String,
      required: false,
    },
    isRequestedFiles: {
      type: Boolean,
      required: true,
      default: false,
    },
    projectDeadline: {
      type: Date,
      required: true,
      default: new Date(),
    },
    projectEstimatedDeadline: {
      type: Date,
      required: true,
      default: new Date(),
    },
    title: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    isUploadedFiles: {
      type: Boolean,
      required: true,
      default: false,
    },
    status: {
      type: String,
      enum: ["in_progress", "completed"],
      required: false,
      default: "in_progress",
    },
    isFeedbackSubmit: {
      type: Boolean,
      required: true,
      default: false,
    },
    stages: {
      type: [
        {
          name: { type: String, required: true },
          description: {
            type: String,
            required: false,
            default: "",
          },
          isUploadedFiles: { type: Boolean, required: false, default: false },
          projectFiles: {
            type: [String],
            default: [],
          },
          start: { type: Date, required: true },
          isClientCompleted: {
            type: Boolean,
            required: true,
            default: false,
          },
          isProviderCompleted: {
            type: Boolean,
            required: true,
            default: false,
          },
          end: { type: Date, required: true },
          status: {
            type: String,
            enum: ["not_started", "in_progress", "completed"],
            default: "not_started",
          },
        },
      ],
      required: true,
    },
    assignedStage: {
      type: Boolean,
      required: true,
      default: false,
    },

    availableHours: [
      {
        type: String,
        required: false,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Project = model("Project", projectSchema);
export default Project;
