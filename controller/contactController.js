const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Create a new contact
const createContact = async (req, res) => {
  const { name, email, phone, text } = req.body;
  if(!name || !email || !phone || !text) {
        res.status(400).json({error:"all filds are required"})
        return
    }
  try {
    const newContact = await prisma.contact.create({
      data: { name, email, phone, text },
    });
    res.status(201).json(newContact);
    console.log(newContact)
  } catch (error) {
    res.status(500).json({ error: 'Error creating contact', details: error.message });
  }
};

// Get all contacts
const getAllContacts = async (req, res) => {
  try {
    const contacts = await prisma.contact.findMany();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching contacts', details: error.message });
  }
};

// Get a single contact by ID
const getContactById = async (req, res) => {
  const { id } = req.params;

  try {
    const contact = await prisma.contact.findUnique({
      where: { id: parseInt(id) },
    });

    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }

    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching contact', details: error.message });
  }
};
module.exports = {createContact,getAllContacts,getContactById}