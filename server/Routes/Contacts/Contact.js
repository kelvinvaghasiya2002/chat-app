import { addContact } from "../../controllers/Contacts/Contact.js";
import { Router } from "express";
import bodyParser from "body-parser";
const jsonParser = bodyParser.json();
const router = Router();

router.post("/addcontact",jsonParser,addContact);



export default router;