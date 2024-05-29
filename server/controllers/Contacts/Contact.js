import Room from "../../Models/Room.js";
import User from "../../Models/user.js";

const addContact = (req, res) => {
    const { user_1, user_2, username_1 } = req.body;

    User.findOne({ email: user_1 }).then((response) => {
        const arr = response.contacts;
        const flag = arr.some((element) => {
            return element.email === user_2
        })
        if (!flag) {
            User.findOne({ email: user_2 }).then((response) => {
                console.log(response);
                if (response) {

                    User.updateOne({ email: user_2 }, {
                        $push: {
                            contacts: {
                                email: user_1,
                                username: username_1
                            }
                        }
                    }, { new: true }).then((response) => {
                        console.log("Contact added in user_2");
                    }).catch((err) => {
                        console.log(err);
                    })

                    User.updateOne({ email: user_1 }, {
                        $push: {
                            contacts: {
                                email: user_2,
                                username: response.username
                            }
                        }
                    }, { new: true }).then((response) => {
                        console.log("Contact added in user_1");
                    }).catch((err) => {
                        console.log(err);
                    })



                    const room = new Room({
                        members: [user_1, user_2],
                    })
                    room.save().then((response) => {
                        res.status(200).json({
                            success: "Contact is added successfully!",
                            response: response
                        })
                    }).catch((err) => {
                        console.log(err);
                        res.status(500).json({
                            error: "Error occured in creating contact!"
                        })
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