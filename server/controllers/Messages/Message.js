import Room from "../../Models/Room.js";
import { io } from "../../app.js";




export const saveMessage = (req, res) => {
    const { id } = req.query;
    const { auther, content } = req.body;

    Room.findOneAndUpdate(
        {
            _id: id
        },
        {
            $push : {
                messages : {
                    auther, content
                }
            }
        },
        {
            new : true
        }
    ).then((response)=>{
        console.log("Hello id",(response._id.valueOf()));
        io.to(response._id.valueOf()).emit("update-room",response)
        res.status(200).json({
            room : response
        })
    }).catch((err)=>{
        console.log(err);
        res.status(500).json({
            error : "last message was not saved!"
        })
    })
}