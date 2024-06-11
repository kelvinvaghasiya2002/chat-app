import mongoose from "mongoose";

export const messageSchema = new mongoose.Schema({
    auther : {
        type : String
    },
    content : {
        type : String
    },
    date : {
        type : String
    },
    time : {
        type : String
    }
})

const memberSchema = new mongoose.Schema({
    email : {
        type : String
    },
    username : {
        type : String
    }
})

const roomSchema = new mongoose.Schema({
    members : {
        type : [memberSchema]
    },
    messages : {
        type : [messageSchema]
    }
})


const Room = new mongoose.model("Room",roomSchema);

export default Room;