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
      unique: false,
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
        return this.company === "company" || this.role === "provider";
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
      type: [
        {
          label: {
            type: String,
            required: true,
          },
          value: {
            type: String,
            required: true,
          },
        },
      ],
      required: function () {
        return this.accountType === "company";
      },
    },
    country: {
      type: String,
      required: function () {
        return this.company === "company" || this.role === "provider";
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

    // ------ Attributes for role == provider block ------
    crNumber: {
      type: String,
      required: false,
      default: "",
    },
    yearsExperience: {
      type: Number,
      required: function () {
        return this.role === "provider";
      },
    },
    expertise: {
      type: [
        {
          label: {
            type: String,
            required: true,
          },
          value: {
            type: String,
            required: true,
          },
        },
      ],
      required: function () {
        return this.accountType === "provider";
      },
    },

    services: [
      {
        type: Schema.Types.ObjectId,
        ref: "Service",
        required: function () {
          return this.role == "provider";
        },
      },
    ],
    city: {
      type: String,
      required: function () {
        return this.role == "provider";
      },
    },
    street: {
      type: String,
      required: function () {
        return this.role == "provider";
      },
    },
    POBox: {
      type: String,
      required: function () {
        return this.role == "provider";
      },
    },
    bankName: {
      type: String,
      required: function () {
        return this.role == "provider";
      },
    },
    bankCountry: {
      type: String,
      required: function () {
        return this.role == "provider";
      },
    },
    bankAccountName: {
      type: String,
      required: function () {
        return this.role == "provider";
      },
    },
    bankAccountNumber: {
      type: String,
      required: function () {
        return this.role == "provider";
      },
    },
    IBNNumber: {
      type: String,
      required: function () {
        return this.role == "provider";
      },
    },
    swiftBank: {
      type: String,
      required: function () {
        return this.role == "provider";
      },
    },
    companyProfile: {
      type: String,
      required: false,
    },
    crDocument: {
      type: String,
      required: false,
    },
    establishmentContract: {
      type: String,
      required: false,
    },
    certificate: {
      type: String,
      required: false,
    },
    otherDocuments: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);
export default User;
