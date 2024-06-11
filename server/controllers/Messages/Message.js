import Room from "../../Models/Room.js";
import User from "../../Models/user.js";
import { io } from "../../app.js";




export const saveMessage = (req, res) => {
    const { id } = req.query;
    const { auther, content, user } = req.body;

    Room.findOneAndUpdate(
        {
            _id: id
        },
        {
            $push: {
                messages: {
                    auther, content
                }
            }
        },
        {
            new: true
        }
    ).then((response) => {
        console.log("Hello id", (response._id.valueOf()));
        io.to(response._id.valueOf()).emit("update-room", response);

        console.log(response.members);

        User.findOneAndUpdate(
            {
                email: response.members[0].email,
                "contacts.email": response.members[1].email
            },
            {
                $set: {
                    "contacts.$.lastMessage": {
                        auther, content
                    }

                    // {
                    //     email:  response.members[1].email,
                    //     username: response.members[1].username,
                    //     lastMessage: {
                    //         auther, content
                    //     },
                    //     pendingMessages: 2
                    // }
                }
            },
            {
                new : true
            }
        ).then((response)=>{
            console.log("updated user_1" , response);
        }).catch((err)=>{
            console.log("Error in updating user_1" , err);
        })


        User.findOneAndUpdate(
            {
                email: response.members[1].email,
                "contacts.email": response.members[0].email
            },
            {
                $set: {
                    "contacts.$.lastMessage": {
                        auther, content
                    }

                    // {
                    //     email:  response.members[0].email,
                    //     username: response.members[0].username,
                    //     lastMessage: {
                    //         auther, content
                    //     },
                    //     pendingMessages: 2
                    // }
                }
            },
            {
                new : true
            }
        ).then((response)=>{
            console.log("updated user_2" , response);
        }).catch((err)=>{
            console.log("Error in updating user_2" , err);
        })


        User.findOne({email : user}).then((result)=>{
            console.log("updated user",result);
            res.status(200).json({
                room: response,
                contactList : result.contacts
            })

        }).catch((err)=>{
            console.log(err);
        })

    }).catch((err) => {
        console.log(err);
        res.status(500).json({
            error: "last message was not saved!"
        })
    })
}