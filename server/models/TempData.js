// server/models/TempData.js
const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema({
  name: { type: String, required: true },
  message: { type: String, required: true }
});

const Data = mongoose.model("Data", DataSchema);

module.exports = Data;