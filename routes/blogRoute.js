const {getBlog,getBlogById,createBlogItem,updateBlog,deleteBlog} = require("../controller/NewsAndBlog")
const multer = require("multer")
const express = require("express")
const router = express.Router()
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({storage:storage})

router.get("/blog",getBlog)
router.post("/create/blog",upload.single("blog"),createBlogItem)
router.put("/update/blog/:id",upload.single("blog"),updateBlog)
router.delete("/delete/blog/:id",deleteBlog)

module.exports = router



