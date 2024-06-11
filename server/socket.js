import User from "./Models/user.js";


const socketHandler = (io) => {
    io.on("connection", (socket) => {
        console.log(`${socket.id} connected`);
        socket.on("message", ({ msg, room }) => {
            console.log(msg);
            socket.to(room).emit("msg", msg);
        })

        socket.on("send-email", (email) => {
            addSocketId(socket.id, email);
        })

        socket.on("msg", (m) => {
            console.log(m);
        })

        socket.on("join-room",(id)=>{
            console.log("Hey", id);
            socket.join(id);
        })

        socket.emit("hi","Heelo")

        socket.on("disconnect", () => {
            console.log(`${socket.id} disconnected`);
            deleteSocketId(socket.id)
        })
    }) 
}


const addSocketId = (socketId, email) => {
    User.findOneAndUpdate(
        { email: email },
        { $set: { socketId: socketId } },
        { new: true }
    ).then((response) => {
        console.log("User Connected");
    }).catch((err) => {
        console.log(err);
    })
}


const deleteSocketId = (socketId) => {
    User.findOneAndUpdate(
        { socketId: socketId },
        { $set: { socketId: null } },
        { new: true }
    ).then((response)=>{
        console.log("User Disconnected");
    }).catch((err)=>{
        console.log(err);
    })
}


export default socketHandler 
