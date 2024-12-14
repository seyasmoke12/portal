const { createPartner, getAllPartners, getPartnerById, updatePartner, deletePartner } = require("../controller/awardAndPartner");
const express = require("express");
const multer = require("multer");

const router = express.Router();

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// Routes
router.post("/partners/image", upload.single("image"), createPartner("image"));
router.post("/partners/logo", upload.single("logo"), createPartner("logo"));
router.get("/getpartners", getAllPartners);
router.get("/getpartner/:id", getPartnerById);
router.delete("/delete/partner/:id", deletePartner);
router.put("/update-partner/:id/image", upload.single("image"), updatePartner("image"));
router.put("/update-partner/:id/logo", upload.single("logo"), updatePartner("logo"));

module.exports = router;
