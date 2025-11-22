import mongoose from "mongoose";

const aboutPageModel = new mongoose.Schema({
    InfoVersion: {
        type: String, // v1, v2, etc.
        required: true,
        trim: true,
    },
    HeaderMessage: {
        type: String,
        required: true,
        trim: true,
    },
    AboutMessage: {
        type: String,
        required: true,
        trim: true,
    },
    PicturePath: {
        type: String,
        required: true,
        trim: true,
    },

    });

export default mongoose.model("About", aboutPageModel, "aboutPage");