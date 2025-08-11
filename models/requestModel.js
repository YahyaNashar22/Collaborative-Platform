import mongoose from "mongoose";

const { Schema, model } = mongoose;

const requestSchema = new Schema(
  {
    clientId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // List of providers that will receive the request -- active on stage 2
    providerId: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        default: [],
      },
    ],
    interestedBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        default: [],
      },
    ],
    serviceId: {
      type: Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    stage: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
      default: 1,
      required: true,
    },
    // timeLineStatus: {
    //   type: String,
    //   enum: ["new", "near", "past"],
    // },
    status: {
      type: String,
      enum: [
        "⏳awaiting admin approval",
        "⏳awaiting providers quotations",
        "⏳awaiting client to choose quotation",
        "accepted",
        "canceled",
      ],
      default: "⏳awaiting admin approval",
      required: true,
    },
    // active on stage 3
    quotations: [
      {
        type: Schema.Types.ObjectId,
        ref: "Quotation",
        required: true,
        default: [],
      },
    ],
    // active on stage 3
    approvedQuotations: [
      {
        type: Schema.Types.ObjectId,
        ref: "Quotation",
        required: true,
        default: [],
      },
    ],
    // active on stage 4
    selectedQuotation: {
      type: Schema.Types.ObjectId,
      ref: "Quotation",
      required: false,
    },

    // properties
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    document: {
      type: String,
      required: false,
      default: "no-document.pdf",
    },
    offerDeadline: {
      type: Date,
      required: true,
    },
    projectDeadline: {
      type: Date,
      required: true,
    },
    budget: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Request = model("Request", requestSchema);
export default Request;

// ------------------------Request Stages--------------------------------
// 1. client sends request.
// 2. admin adds providerIds to request.
// 3. providers add quotations and admin approves them.
// 4. client chooses a quotation and start project or cancels the request.
// ------------------------Request Stages--------------------------------

//-----------------------Remarks For Front End------------------------------
// at Stage 4 it should only be visible to the selected quotation's provider
//-----------------------Remarks For Front End------------------------------
