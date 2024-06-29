import express from "express"
import bodyParser from "body-parser";
import sendEmail from "../../controllers/Emails/SendEmail.js";
const router = express.Router();
const jsonParser = bodyParser.json();
const urlEncoded = bodyParser.urlencoded();


router.post("/sendemail" , urlEncoded , sendEmail);




export default router;