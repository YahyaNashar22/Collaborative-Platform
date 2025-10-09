import mongoose from "mongoose";

const { Schema, model } = mongoose;

const notificationSchema = new Schema(
    {
        text: {
            type: String,
            required: true
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    {
        timestamps: true
    });

const Notification = model("Notification", notificationSchema);

export default Notification;