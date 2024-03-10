const express = require("express");
const router = express.Router();
const blogRoutes = require("./blogsRoute.js");

router.use("/blogs", blogRoutes);

module.exports = router;
