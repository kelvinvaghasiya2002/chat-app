import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    auther : {
        type : String
    },
    content : {
        type : String
    }
})

const roomSchema = new mongoose.Schema({
    members : {
        type : [String]
    },
    messages : {
        type : [messageSchema]
    }
})