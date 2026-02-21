const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// 👇 ADD THIS
const dashboardRoutes = require("./routes/dashboard");
app.use("/api/dashboard", dashboardRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});