const express = require("express");
const router = express.Router();

// Dummy data for now
router.get("/", (req, res) => {
  res.json([
    { number: "MH12AB1234", driver: "Rahul", status: "Active" },
    { number: "MH14XY5678", driver: "Amit", status: "Inactive" },
  ]);
});

module.exports = router;