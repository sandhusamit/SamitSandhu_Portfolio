import mongoose from "mongoose";

const welcomeSchema = new mongoose.Schema({
    message: {
        type: String,
        required: true,
        trim: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    });

export default mongoose.model("Welcome", welcomeSchema, "welcome");