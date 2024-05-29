import mongoose, { Mongoose } from "mongoose";

const ContactSchema = new mongoose.Schema({
    email : {
        type : String
    },
    username : {
        type : String
    }
})

const UserSchema = new mongoose.Schema({
    username : {
        type : String
    },
    email : {
        type : String
    },
    password : {
        type : String
    },
    socketId : {
        type : String,
        default : null
    },
    contacts : {
        type : [ContactSchema]
    }
});


const User = new mongoose.model("User", UserSchema)

export default User;