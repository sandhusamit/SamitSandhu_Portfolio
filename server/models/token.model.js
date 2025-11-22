import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",        // reference to your user collection
    required: true,
  },
  tokenString: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    enum: ["active", "revoked", "expired"],
    default: "active",
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
  expiresOn: {
    type: Date,
    required: true,
  },
});

// Optional: automatically remove expired tokens (MongoDB TTL index)
tokenSchema.index({ expiresOn: 1 }, { expireAfterSeconds: 0 });

const Token = mongoose.model("Token", tokenSchema);

export default Token;
