import express from "express";
import messageModel from "../models/message.model.js";
//CRUD
// 1️⃣ Create a new message
export const createMessage = async (req, res) => {
  try {
    const { userID, contactID, message, timestamp, service } = req.body;

    const newMessage = new messageModel({
      userID,
      contactID,
      message,
      timestamp,
      service
    });

    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 2️⃣ Get message by messageID
export const getMessageByID = async (req, res) => {
    try {
        const message = await messageModel.findById(req.params.id);
        if (!message) {
            return res.status(404).json({ message: "Message not found" });
        }
        res.status(200).json(message);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 3️⃣ Update message by messageID
export const updateMessageByID = async (req, res) => {
    try {
        const updatedMessage = await messageModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedMessage) {
            return res.status(404).json({ message: "Message not found" });
        }
        res.status(200).json(updatedMessage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// 4️⃣ Delete message by messageID
export const deleteMessageByID = async (req, res) => {
    try {
        const deletedMessage = await messageModel.findByIdAndDelete(req.params.id);
        if (!deletedMessage) {
            return res.status(404).json({ message: "Message not found" });
        }
        res.status(200).json({ message: "Message deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// 5️⃣ Get all messages
export const getAllMessages = async (req, res) => {
    try {
        const messages = await messageModel.find();
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// 6️⃣ Get messages by contactID
export const getMessagesByContactID = async (req, res) => {
    try {
        const messages = await messageModel.find({ contactID: req.params.contactID });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete all messages (for testing purposes)
export const deleteAllMessages = async (req, res) => {
    try {
        await messageModel.deleteMany({});
        res.status(200).json({ message: "All messages deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
