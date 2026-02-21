const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/HackathonDB")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Server is running");
});
const vehicleRoutes = require("./routes/vehicleRoutes");
app.use("/api/vehicles", vehicleRoutes);

const tripRoutes = require("./routes/tripRoutes");
app.use("/api/trips", tripRoutes);

const authRoutes = require("./routes/authRoutes");
console.log("AuthRoutes:", authRoutes);
app.use("/api/auth", authRoutes);

const dashboardRoutes = require("./routes/dashboard");
app.use("/api/dashboard", dashboardRoutes);

const driverRoutes = require("./routes/driverRoutes");
app.use("/api/drivers", driverRoutes);
const Data = require("./models/TempData");

const maintenanceRoutes = require("./routes/maintenanceRoutes");
app.use("/api/maintenance", maintenanceRoutes);
app.post("/submit", async (req, res) => {
  try {
    console.log("Incoming data:", req.body);

    const newData = new Data(req.body);
    await newData.save();

    console.log("Data saved successfully");
    res.json({ message: "Data saved successfully" });

  } catch (error) {
    console.log("Error saving data:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});
app.get("/data", async (req, res) => {
  const allData = await Data.find();
  res.json(allData);
});
app.listen(5000, () => {
  console.log("Server running on port 5000");
});