import express from "express";
import mongoose from "mongoose";
import 'dotenv/config'
import loginRouter from "./Routes/Auth/localAuth.js";
import ContactRouter from "./Routes/Contacts/contact.js";
import MsgRouter from "./Routes/Messages/Message.js";
import {createServer} from "http";
import { Server } from "socket.io";
import cors from "cors";
import socketHandler from "./socket.js";


// -------------------------- Declarations ---------------------------

const app = express();
const client = process.env.CLIENT;
const server = createServer(app);
const mongoUrl = process.env.MONGO_URL;

export const io = new Server(server , {
    cors : {
        origin : `${client}`,
        methods : ["GET","POST","PUT","PATCH","DELETE"],
        credentials : true
    }
});



// ----------------------------------------------------


app.use(cors({
    origin : `${client}`,
    methods : ["GET","POST","PUT","PATCH","DELETE"],
    credentials : true
}));


mongoose.connect(mongoUrl).then(()=>{
    console.log("Database Connected");
}).catch((err)=>{
    console.log(err);
})

socketHandler(io);



// ------------------------  Routers -----------------------------

app.use(loginRouter);
app.use(ContactRouter);
app.use(MsgRouter);

app.get("/",(req,res)=>{
    res.json({
        success : "Deployed Successfully!"
    })
})

// ---------------------------------------------------------------


server.listen(3000,()=>{
    console.log(`Server is live on 3000`);
})
