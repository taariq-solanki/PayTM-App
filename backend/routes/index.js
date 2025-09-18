const express = require("express");
const router = express.Router();

// Example main route
router.get("/", (req, res) => {
  res.json({ message: "Welcome to the main API!" });
});

module.exports = router;
