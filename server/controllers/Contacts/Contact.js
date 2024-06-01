import Room from "../../Models/Room.js";
import User from "../../Models/user.js";
import { io } from "../../app.js";


const addContact = (req, res) => {
    const { user_1, user_2, username_1 } = req.body;

    User.findOne({ email: user_1 }).then((response) => {
        const arr = response.contacts;
        const flag = arr.some((element) => element.email === user_2)

        if (!flag) {
            User.findOne({ email: user_2 }).then((response) => {
                console.log(response);
                if (response) {

                    User.findOneAndUpdate({ email: user_2 }, {
                        $push: {
                            contacts: {
                                email: user_1,
                                username: username_1
                            }
                        }
                    }, { new: true }).then((response) => {
                        console.log("Contact added in user_2",response);
                        io.to(response.socketId).emit("from-user",response);
                    }).catch((err) => {
                        console.log(err);
                    })

                    

                    User.findOneAndUpdate({ email: user_1 }, {
                        $push: {
                            contacts: {
                                email: user_2,
                                username: response.username
                            }
                        }
                    }, { new: true }).then((response) => {
                        console.log("Contact added in user_1");
                        res.status(200).json({
                            success: "Contact is added successfully!",
                            user: response
                        })
                    }).catch((err) => {
                        console.log(err);
                        res.status(500).json({
                            error: "Error occured in creating contact!"
                        })
                    })



                    const room = new Room({
                        members: [user_1, user_2],
                    })
                    room.save().then((response) => {
                        console.log("Room Is Created!");
                    }).catch((err) => {
                        console.log(err);
                    })
                } else {
                    res.status(400).json({
                        error: "This User doen't exist!"
                    })
                }
            })
        } else {
            res.status(400).json({
                error: "This Contact already exist!"
            })
        }
    })


}

export { addContact };