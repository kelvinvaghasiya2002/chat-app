import express from "express";
import mongoose from "mongoose";
const app = express();
import 'dotenv/config'
import loginRouter from "./Routes/Auth/localAuth.js";
import ContactRouter from "./Routes/Contacts/contact.js";
import {createServer} from "http";
import { Server } from "socket.io";
import cors from "cors";
const client = process.env.CLIENT;
app.use(cors({
    origin : `${client}`,
    methods : ["GET","POST"],
    credentials : true
}));

const server = createServer(app);

const io = new Server(server , {
    cors : {
        origin : `${client}`,
        methods : ["GET","POST"],
        credentials : true
    }
});

const mongoUrl = process.env.MONGO_URL;

mongoose.connect(mongoUrl).then(()=>{
    console.log("Database Connected");
}).catch((err)=>{
    console.log(err);
})

io.on("connection",(socket)=>{
    console.log(`${socket.id} connected`);

    socket.on("message",({msg,room})=>{
        console.log(msg);
        socket.to(room).emit("msg",msg);
    })

    socket.on("disconnect",()=>{
        console.log(`${socket.id} disconnected`);
    })

    socket.on("msg",(m)=>{
        console.log(m);
    })
})


app.get("/",(req,res)=>{
    res.send("Hello World")
})

app.use(loginRouter);
app.use(ContactRouter);

server.listen(3000,()=>{
    console.log(`Server is live on 3000`);
})
