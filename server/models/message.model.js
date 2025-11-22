import mongoose from "mongoose";

const messageModel = new mongoose.Schema({

    contactID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Contact",
        required: true,
        trim: true,
    },
    message: {
        type: String,
        required: true,
        maxlength: 2000,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    service: {
        type: String,
        // required: true,
        trim: true,
    }
});
export default mongoose.model("Message", messageModel, "messages");