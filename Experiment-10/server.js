const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Connect MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/collegeDB")
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));

// Routes
const studentRoutes = require("./routes/studentRoutes");
app.use("/api/students", studentRoutes);

// Start Server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});