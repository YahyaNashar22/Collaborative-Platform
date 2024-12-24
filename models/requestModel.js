import mongoose from "mongoose";

const { Schema, model } = mongoose;

//TODO: ADD APPROVED QUOTATIONS FIELD ( APPROVED BY ADMIN )

const requestSchema = new Schema(
    {
        clientId: {
            type: Schema.Types.ObjectId,
            ref: "Request",
            required: true
        },
        serviceId: {
            type: Schema.Types.ObjectId,
            ref: "Service",
            required: true
        },
        stage: {
            type: Number,
            enum: [1, 2, 3, 4, 5],
            required: true
        },
        status: {
            type: String,
            enum: ["awaiting admin approval", "awaiting providers quotations", "awaiting admin to review quotations", "awaiting client to choose quotation", "accepted", "canceled"],
            required: true
        },
        // active on stage 2
        //TODO: CHANGE THIS TO BE REF OF QUOTATION MODEL
        offers: [{
            providerId: {
                type: Schema.Types.ObjectId,
                ref: "Provider",
                required: false
            },
            quotation: {
                type: String,
                required: false
            }
        }]
    },
    {
        timestamps: true
    }
);

const Request = model("Request", requestSchema);
export default Request;