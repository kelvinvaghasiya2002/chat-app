import Room from "../../Models/Room.js";
import User from "../../Models/user.js";

const addContact = (req,res)=>{
    const {user_1 , user_2} = req.body;
    User.findOne({email : user_2}).then((response)=>{
        console.log(response);
        if(response){
            const room = new Room ({
                members : [user_1 , user_2],
            })
            room.save().then((response)=>{
                res.status(200).json({
                    success : "Contact is added successfully!",
                    response : response
                })
            }).catch((err)=>{
                console.log(err);
                res.status(500).json({
                    error : "Error occured in creating contact!"
                })
            })
        }else{
            res.status(400).json({
                error : "This User doen't exist!"
            })
        }
    })
}

export {addContact};