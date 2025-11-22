import mongoose from "mongoose";

const ContactModel = new mongoose.Schema({

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
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  poc: {
    type: String,
    trim: true,
  },

  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Contact", ContactModel, "contacts");
