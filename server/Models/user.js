import mongoose, { Mongoose } from "mongoose";

const UserSchema = new mongoose.Schema({
    email : {
        type : String
    },
    password : {
        type : String
    },
    socketId : {
        type : String
    }
});


const User = new mongoose.model("User", UserSchema)

export default User;