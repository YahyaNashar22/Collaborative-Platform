import mongoose from "mongoose";

const { Schema, model } = mongoose;

const serviceSchema = new Schema({
    name: String,
    description: String
});

const Service = model ("Service", serviceSchema);
export default Service;