import mongoose from "mongoose";


const { Schema, model } = mongoose;

// TODO: ADD PROJECT TIMELINE || REQUESTED FILE || Time Line Status || Payment GateAway

const projectSchema = new Schema({
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
        required: false
    },
    isRequestedFiles: {
        type: Boolean,
        required: true,
        default: false
    },
    isUploadedFiles: {
        type: Boolean,
        required: true,
        default: false
    },
    status: {
        type: String,
        enum: ["in_progress", "completed"],
        required: false,
        default: "in_progress"
    },
    stages: {
        type: [String],
        required: true,
        default: ["Mobilization", "Discovery", "Design", "Execution", "Reporting and Feedback"]
    },
    timelines: {
        type: [String],
        validate: {
            validator: function (value) {
                return value.length === this.stages.length;
            },
            message: "Timelines array length must match stages array length."
        }
    },
    stage: {
        type: String,
        required: true,
        default: function () {
            return this.stages[0];
        },
    },
},
    {
        timestamps: true,
    }
);

const Project = model("Project", projectSchema);
export default Project;