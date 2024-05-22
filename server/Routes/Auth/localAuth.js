import express from "express";
const router = express.Router();
import { addUser, getUser , loginUser } from "../../controllers/Auth/login.js";
import bodyParser from "body-parser";
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: true })

router.get("/getuser", getUser);
router.post("/loginuser",jsonParser , loginUser);
router.post("/adduser",jsonParser, addUser);

export default router;