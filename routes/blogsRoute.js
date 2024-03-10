const express = require("express");
const router = express.Router();
const blogController = require("../Controller/blogsController.js");

router.get("/", blogController.allBlogs);
router.get("/:id", blogController.getBlogById);
router.post("/", blogController.addBlog);
router.patch("/:id", blogController.updateBlog);
router.delete("/:id", blogController.deleteBlog);

module.exports = router;
