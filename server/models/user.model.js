import mongoose from "mongoose";
import bcrypt from 'bcrypt';
/*
Can add field for userID - every user has a contact but not every contact is a user
*/
const userModel = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
      },
});
userModel.pre('save', async function (next){
    if(this.isModified('password') || this.isNew){
        this.password = await bcrypt.hash(this.password, 10)  // Hashing
    }
    next();
})

userModel.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

export default mongoose.model("User", userModel, "users");