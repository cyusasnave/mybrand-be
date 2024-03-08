const express = require("express");
const router = express.Router();
const blogController = require("../Controller/blogsController.js");

router.get("/", blogController.allBlogs);
router.get("/:id", blogController.getBlogById);
router.post("/new", blogController.addBlog);
router.patch("/update/:id", blogController.updateBlog);
router.delete("/delete/:id", blogController.deleteBlog);

module.exports = router;
