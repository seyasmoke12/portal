const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createPartner = (type) => async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "File is required." });
    }

    const partnerData = { [type]: req.file.filename };

    const partner = await prisma.partner.create({
      data: partnerData,
    });

    res.status(201).json(partner);
  } catch (error) {
    console.error("Error creating partner:", error.message);
    res.status(500).json({ error: "Internal server error", details: error.message });
  }
};

const getAllPartners = async (req, res) => {
  try {
    const partners = await prisma.partner.findMany();
    res.status(200).json(partners);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch partners", details: error.message });
  }
};

const getPartnerById = async (req, res) => {
  try {
    const partner = await prisma.partner.findUnique({
      where: { id: parseInt(req.params.id) },
    });
    if (!partner) {
      return res.status(404).json({ error: "Partner not found" });
    }
    res.status(200).json(partner);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch partner", details: error.message });
  }
};

const updatePartner = (type) => async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: `${type} file is required.` });
    }

    const updatedPartner = await prisma.partner.update({
      where: { id: parseInt(req.params.id) },
      data: { [type]: req.file.filename },
    });

    res.status(200).json(updatedPartner);
  } catch (error) {
    res.status(500).json({ error: "Failed to update partner", details: error.message });
  }
};

const deletePartner = async (req, res) => {
  try {
    const partner = await prisma.partner.delete({
      where: { id: parseInt(req.params.id) },
    });
    res.status(200).json(partner);
  } catch (error) {
    res.status(400).json({ error: "Failed to delete partner", details: error.message });
  }
};

module.exports = { createPartner, getAllPartners, getPartnerById, updatePartner, deletePartner };
