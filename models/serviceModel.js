import mongoose from "mongoose";

const { Schema, model } = mongoose;

const serviceSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    }
},
    {
        timestamps: true,
    }
);

const Service = model("Service", serviceSchema);
export default Service;