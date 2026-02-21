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
const Data = require("./models/TempData");

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