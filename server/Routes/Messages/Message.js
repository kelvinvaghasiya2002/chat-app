import express from "express"
import bodyParser from "body-parser";
import { saveMessage } from "../../controllers/Messages/Message.js";
const router = express.Router();

const jsonParser = bodyParser.json();

router.post("/savemessage",jsonParser,saveMessage)

export default router;