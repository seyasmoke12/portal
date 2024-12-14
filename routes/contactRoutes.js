const express = require('express');
const {getAllContacts,createContact,getContactById} = require("../controller/contactController")
const router = express.Router();

router.post('/contacts',createContact);
router.get('/get/contacts',getAllContacts);
router.get('/contacts/:id',getContactById);


module.exports = router;