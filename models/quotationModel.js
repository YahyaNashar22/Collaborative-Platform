import mongoose from "mongoose";

const { Schema, model } = mongoose;

const quotationSchema = new Schema(
  {
    requestId: {
      type: Schema.Types.ObjectId,
      ref: "Request",
      required: true,
    },
    providerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    estimatedDeadline: [
      {
        type: Date,
        required: false,
      },
    ],
    uploadedFile: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Quotation = model("Quotation", quotationSchema);
export default Quotation;
