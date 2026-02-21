const express = require("express");
const router = express.Router();

router.get("/stats", (req, res) => {
  res.json({
    totalUsers: 15,
    totalVehicles: 8,
    totalRevenue: 250000,
    totalReports: 12,
  });
});

module.exports = router;