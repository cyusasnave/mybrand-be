const express = require("express");
const router = express.Router();
const routes = require("./blogsRoute");

router.get("/", (req, res) => {
  res.send("hello World!");
});

module.exports = router;
