import { addContact } from "../../controllers/Contacts/Contact.js";
import { Router } from "express";
import bodyParser from "body-parser";
import getRoom, { GetRoom } from "../../controllers/Contacts/GetRoom.js";
const jsonParser = bodyParser.json();
const urlEnc = bodyParser.urlencoded({extended : true});
const router = Router();

router.post("/addcontact",jsonParser,addContact);
router.post("/getroom",jsonParser,getRoom)
router.get("/getroom",GetRoom)


export default router;