import mongoose from "mongoose";


const { Schema, model } = mongoose;

const transactionSchema = new Schema(
    {
        from: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        to: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        amount: {
            type: Number,
            required: true
        }
    },
    {
        timestamps: true
    });

const Transaction = model("Transaction", transactionSchema);
export default Transaction;