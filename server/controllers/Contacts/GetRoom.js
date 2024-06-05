import Room from "../../Models/Room.js";

const getRoom = (req, res) => {
    const { user_1, user_2 } = req.body;
    Room.findOne({
        $or:
            [
                { members: [user_1, user_2] },
                { members: [user_2, user_1] }
            ]
    }).then((response) => {
        res.status(200).json({
            success : "Found a room with containing these users!",
            room : response
        })
    }).catch((err) => {
        console.log(err);
        res.status(404).json({
            error : "Couldn't found room with these users!"
        })
    })
}

export const GetRoom = (req,res)=>{
    const {id} = req.query;
    Room.findOne({_id : id}).then((response)=>{
        res.status(200).json({
            room : response
        })
    }).catch((err)=>{
        console.log(err);
        res.status(403).json({
            error : "Room is not found!"
        })
    })
}


export default getRoom;