import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    otp:
    {
        type: String,
        required: true
    },
    email:
    {
        type: String,
        required: true
    },
    createdAt:
    {
        type: Date,
        default: Date.now()
    }
})

otpSchema.index({createdAt : 1} , {expireAfterSeconds : 120})

const otp = new mongoose.model("otp" , otpSchema);

export default otp;