import jwt from "jsonwebtoken";
import User from "../../Models/user.js";
import bcrypt from "bcrypt"
const saltRounds = 10;

export const getUser = (req, res) => {
    const token = req.headers.token;
    const secret = process.env.JWT_SECRET;
    const user = jwt.verify(token, secret);
    User.findOne({ email: user.email }).then((response) => {
        if (!response) {
            res.status(400).json({
                error: "You are not authorized!",
                login : false
            })
        } else {
            res.status(200).json({
                success: "You are authorized!",
                user: response,
                login : true
            })
        }
    })

}


export const loginUser = (req, res) => {
    const { email, password} = req.body;
    const secret = process.env.JWT_SECRET;
    User.findOne({ email: email }).then((response) => {
        if (!response) {
            res.status(400).json({
                error: "This user does not exist!"
            })
        } else {
            bcrypt.compare(password, response.password, function (err, result) {
                if (err) {
                    res.status(500).json({
                        error: "Internal server error!"
                    })
                }
                else if (result) {
                    const token = jwt.sign({
                        email: email
                    }, secret, { expiresIn: "1d" })

                    res.status(200).json({
                        success: "you are successfully logged in!",
                        user: response,
                        token: token
                    })
                } else {
                    res.status(400).json({
                        error: "Password is wrong!"
                    })
                }
            });
        }

    }).catch((err) => {
        console.log(err);
        res.status(400).json({
            error: "Error occured in signing in!"
        })
    })
}



export const addUser = (req, res) => {
    const { email, password, username } = req.body;
    const secret = process.env.JWT_SECRET;
    User.findOne({ email: email }).then((response) => {
        if (response) {
            res.status(400).json({
                error: "THIS user already exist!"
            })
        } else {
            bcrypt.hash(password, saltRounds, (err, hash) => {
                if (err) {
                    res.status(500).json({
                        error: "Internal server error!"
                    })
                } else {
                    const token = jwt.sign({
                        email: email
                    }, secret, { expiresIn: "1d" })

                    const newUser = new User({
                        email: email,
                        password: hash,
                        username
                    });

                    newUser.save().then((response) => {
                        console.log(response);
                        res.status(200).json({
                            success: "you are successfully registerd!",
                            user: response,
                            token: token
                        })
                    }).catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: "Internal server error!"
                        })
                    })
                }
            })
        }
    }).catch((err) => {
        res.status(500).json({
            error: "Internal server error!"
        })
    })
}