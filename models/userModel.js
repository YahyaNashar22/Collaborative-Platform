import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        default: '/uploads/profile.png',
        required: false,
    },
    company: {
        type: String,
        enum: ["company", "individual"],
        default: "company",
        required: true,
    },
    role: {
        type: String,
        enum: ["super", "admin", "client", "provider"],
        default: "client",
        required: true,
    },
    address: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true,
    },
    language: {
        type: String,
        enum: ["english", "arabic", "english-arabic"],
        default: "english",
        required: true
    },

    // ------ Attributes for role == admin block ------
    // admin should have his own clients and only the super as provider -- admin can only view
    admin:
    {
        type: Schema.Types.ObjectId,
        ref: "User",
    }
    ,

    // ------ Attributes for role == client || role == provider Block ------
    banned: {
        type: Boolean,
        required: function () {
            return this.role == "client" || this.role == "provider";
        },
        default: false
    },

    // ------ Attributes for role == client Block ------
    howSoonServices: {
        type: String,
        enum: ["immediately", "within a month", "in the next 2-3 months", "in the next 4-6 months", "in the next 6-12 months", "others"],
        required: function () {
            return this.role == "client";
        }
    },
    estimatedBudget: {
        type: Number,
        required: function () {
            return this.role == "client";
        }
    },
    scopeOfWork: {
        // File
        type: String,
        required: function () {
            return this.role == "client";
        }
    },

    // ------ Attributes for role == provider block ------
    experience: {
        // Text Field
        type: String,
        required: function () {
            return this.role == "provider";
        }
    },
    cvOrCompanyProfile: {
        // File
        type: String,
        required: function () {
            return this.role == "provider";
        }
    },
    availability: {
        type: Boolean,
        required: function () {
            return this.role == "provider";
        },
        default: true
    },
    // aka - Area of expertise
    services: [{
        type: Schema.Types.ObjectId,
        ref: 'Service',
        required: function () {
            return this.role == "provider";
        }
    }]
},
    {
        timestamps: true,
    }
);


const User = model("User", userSchema);
export default User;