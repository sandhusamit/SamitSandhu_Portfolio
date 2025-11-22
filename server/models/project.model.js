import mongoose from "mongoose";

const ProjectModel= new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    picSource: {
        type: String,
        required: true,
        trim: true,
    },

    description: {
        type: String,
        required: true,
        trim: true,
    },
    completeDate: {
        type: Date,
    },
});

export default mongoose.model("Project", ProjectModel, "projects");