const express = require("express");
const router = express.Router();

const Maintenance = require("../models/Maintenance");
const Vehicle = require("../models/Vehicle");


// CREATE maintenance record
router.post("/", async (req, res) => {
  try {
    const { vehicleId, description, cost } = req.body;

    const vehicle = await Vehicle.findById(vehicleId);

    if (!vehicle) {
      return res.status(404).json({ error: "Vehicle not found" });
    }

    const maintenance = await Maintenance.create({
      vehicleId,
      description,
      cost,
    });

    // Optional: Mark vehicle under maintenance
    vehicle.status = "InShop";
    await vehicle.save();

    res.status(201).json(maintenance);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// GET all maintenance records
router.get("/", async (req, res) => {
  try {
    const records = await Maintenance.find().populate("vehicleId");
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// COMPLETE maintenance
router.put("/:id/complete", async (req, res) => {
  try {
    const maintenance = await Maintenance.findById(req.params.id);

    if (!maintenance) {
      return res.status(404).json({ error: "Maintenance record not found" });
    }

    maintenance.status = "Completed";
    await maintenance.save();

    // Make vehicle available again
    const vehicle = await Vehicle.findById(maintenance.vehicleId);
    vehicle.status = "Available";
    await vehicle.save();

    res.json({ message: "Maintenance completed" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
