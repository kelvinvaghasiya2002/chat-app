import Room from "../../Models/Room.js";
import User from "../../Models/user.js";
import { io } from "../../app.js";




export const saveMessage = (req, res) => {
    const { id } = req.query;
    const { auther, content, user , time , date } = req.body;

    Room.findOneAndUpdate(
        {
            _id: id
        },
        {
            $push: {
                messages: {
                    auther, content , time, date 
                }
            }
        },
        {
            new: true
        }
    ).then((RESPONSE) => {
        console.log("Hello id", (RESPONSE._id.valueOf()));
        io.to(RESPONSE._id.valueOf()).emit("update-room", RESPONSE);
        // console.log(io.sockets.sockets[]);

        // console.log(response.members);

        User.findOneAndUpdate(
            {
                email: RESPONSE.members[0].email,
                "contacts.email": RESPONSE.members[1].email
            },
            {
                $set: {
                    "contacts.$.lastMessage": {
                        auther, content, time, date 
                    }
                }
            },
            {
                new : true
            }
        ).then((response)=>{
            // console.log("updated user_1" , response.contacts[0].lastMessage);

            if(user !== response.email){
                // console.log(user + "....." + response.email);
                io.to(response.socketId).emit("update-contactList", response.contacts);
            }
        }).catch((err)=>{
            console.log("Error in updating user_1" , err);
        })


        User.findOneAndUpdate(
            {
                email: RESPONSE.members[1].email,
                "contacts.email": RESPONSE.members[0].email
            },
            {
                $set: {
                    "contacts.$.lastMessage": {
                        auther, content, time, date 
                    }
                }
            },
            {
                new : true
            }
        ).then((response)=>{
            // console.log("updated user_2" , response.contacts[0].lastMessage);

            // last message has been saved in both user_1 and user_2 now it's time to send updated user to front-end!
            if(user !== response.email){
                // console.log(user + "--" + response.email);
                io.to(response.socketId).emit("update-contactList", response.contacts);
            }

            User.findOne({email : user}).then((result)=>{
                // console.log("updated user",result.contacts[0].lastMessage);
                res.status(200).json({
                    room: RESPONSE,
                    contactList : result.contacts
                })
    
            }).catch((err)=>{
                console.log(err);
            })


        }).catch((err)=>{
            console.log("Error in updating user_2" , err);
        })

    }).catch((err) => {
        console.log(err);
        res.status(500).json({
            error: "last message was not saved!"
        })
    })
}