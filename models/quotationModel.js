import mongoose from "mongoose";

const { Schema, model } = mongoose;

// TODO: ADD FILE FIELD

const quotationSchema = new Schema({
    providerId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    message: {
        type: String,
        required: false
    },
    availableHours: [{
        type: String,
        required: false
    }]
});

const Quotation = model("Quotation", quotationSchema);
export default Quotation;