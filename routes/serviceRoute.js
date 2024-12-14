const express = require("express");
const multer = require("multer")
const { getServices,createServiceItem,serviceUpdate,getServiceById,deleteService} = require("../controller/serviceController");
const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

router.get("/services",getServices);
router.post("/create/service",upload.single("photo"), createServiceItem);
router.get("/serviceid/:id",getServiceById)
router.put("/update/service/:id",upload.single("photo"), serviceUpdate)
router.delete("/delete/service/:id",deleteService)

module.exports = router
