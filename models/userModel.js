import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    recoveryEmail: {
      type: String,
      required: false,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    job: {
      type: String,
      required: false,
    },
    profilePicture: {
      type: String,
      default: "default",
      required: false,
    },
    accountType: {
      type: String,
      enum: ["individual", "company"],
      required: true,
      default: "individual",
    },
    role: {
      type: String,
      enum: ["super", "admin", "client", "provider"],
      default: "client",
      required: true,
    },
    companyName: {
      type: String,
      required: function () {
        return this.company === "company";
      },
    },
    companyDescription: {
      type: String,
      required: false,
    },
    companyWebsite: {
      type: String,
      required: false,
    },

    industry: {
      type: String,
      required: function () {
        return this.company === "company";
      },
    },
    liscence: {
      type: String,
      required: false,
    },

    // ------ Attributes for role == admin block ------
    // admin should have his own clients and only the super as provider -- admin can only view
    admin: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    // ------ Attributes for role == client || role == provider Block ------
    banned: {
      type: Boolean,
      required: function () {
        return this.role == "client" || this.role == "provider";
      },
      default: false,
    },

    // ------ Attributes for role == client Block ------
    // howSoonServices: {
    //   type: String,
    //   enum: [
    //     "immediately",
    //     "within a month",
    //     "in the next 2-3 months",
    //     "in the next 4-6 months",
    //     "in the next 6-12 months",
    //     "others",
    //   ],
    //   required: function () {
    //     return this.role == "client";
    //   },
    // },
    // estimatedBudget: {
    //   type: Number,
    //   required: function () {
    //     return this.role == "client";
    //   },
    // },
    // scopeOfWork: {
    //   // File
    //   type: String,
    //   required: function () {
    //     return this.role == "client";
    //   },
    // },

    // ------ Attributes for role == provider block ------
    experience: {
      // Text Field
      type: String,
      required: function () {
        return this.role == "provider";
      },
    },
    cvOrCompanyProfile: {
      // File
      type: String,
      required: function () {
        return this.role == "provider";
      },
    },
    availability: {
      type: Boolean,
      required: function () {
        return this.role == "provider";
      },
      default: true,
    },
    // aka - Area of expertise
    services: [
      {
        type: Schema.Types.ObjectId,
        ref: "Service",
        required: function () {
          return this.role == "provider";
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);
export default User;
