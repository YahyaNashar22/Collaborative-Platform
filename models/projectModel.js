import mongoose from "mongoose";

const { Schema, model } = mongoose;

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
});

const Project = model("Project", projectSchema);
export default Project;