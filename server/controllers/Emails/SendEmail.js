import nodemailer from "nodemailer"
import otpGenerator from "otp-generator";
import OTP from "../../Models/Otp.js";


const sendEmail = (req, res) => {
    const { email } = req.body;
    const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false })
    console.log(otp,email);

    const transporter = nodemailer.createTransport({
        host: `${process.env.SMTP_HOST}`,
        port: 587,
        secure: false, 
        auth: {
            user: `${process.env.SMTP_USER}`,
            pass: `${process.env.SMTP_PASS}`,
        },
    });


    async function main() {
        const info = await transporter.sendMail({
            from: 'support@chat.com', // sender address
            to: email,
            subject: "Here's the 6-digit verification code you requested", // Subject line
            html: `<h1>${otp}</h1><br><br><p>If you didn't request a code, kindly ignore!</p>`, // html body
        });

        console.log("Message sent: %s", info.messageId);
    }

    main().then(()=>{
        OTP.findOneAndDelete({email : email}).then((Response)=>{
            console.log(Response );
            const newOtp = new OTP({email : email, otp : otp});
            newOtp.save().then((response)=>{
                res.status(200).json({
                    success : "OTP sent successfully",
                    createdAt : response.createdAt
                })
            });
        })
    }).catch(err => {
        console.log(err);
    });
}


export default sendEmail;