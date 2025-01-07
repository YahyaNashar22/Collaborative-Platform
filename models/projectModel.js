import mongoose from "mongoose";


const { Schema, model } = mongoose;

// TODO: ADD PROJECT TIMELINE || REQUESTED FILE || Time Line Status

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
    status: {
        type: String,
        enum: ["in_progress", "completed"],
        required: false
    },
    stage: {
        type: String,
        // including phase 5 --> feedback
        enum: ["phase 1", "phase 2", "phase 3", "phase 4", "phase 5"],
        default: "phase 1",
        required: true
    },
},
    {
        timestamps: true,
    }
);

const Project = model("Project", projectSchema);
export default Project;