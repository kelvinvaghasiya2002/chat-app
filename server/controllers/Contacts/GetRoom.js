import Room from "../../Models/Room.js";

const getRoom = (req, res) => {
    const { user_1, user_2 , username_2 , username_1 } = req.body;
    console.log(user_1, user_2 , username_2 , username_1 );
    Room.findOne({
        $and:
            [
                {
                    "members.email" : user_1
                },
                {
                    "members.email" : user_2
                }
            ]
    }).then((response) => {
        // console.log(response);
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