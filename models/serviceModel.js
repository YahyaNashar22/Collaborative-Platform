import mongoose from "mongoose";

//TODO: ADD IMAGE FIELD

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