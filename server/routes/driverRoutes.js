const express = require("express");
const router = express.Router();
const Driver = require("../models/Driver");

// Create driver
router.post("/", async (req, res) => {
  const driver = await Driver.create(req.body);
  res.json(driver);
});

// Get all drivers
router.get("/", async (req, res) => {
  const drivers = await Driver.find();
  res.json(drivers);
});

module.exports = router;