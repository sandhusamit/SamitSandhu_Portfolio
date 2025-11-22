import mongoose from "mongoose";

const qualificationModel = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    startDate: {
        type: Date    },
    completeDate: {
        type: Date,
    }
});

export default mongoose.model("Qualification", qualificationModel, "qualifications");