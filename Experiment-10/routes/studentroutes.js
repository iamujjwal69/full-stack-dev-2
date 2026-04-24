const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// CREATE a new student
router.post("/", async (req, res) => {
  try {
    const data = await Student.create(req.body);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to create record" });
  }
});

// READ all students
router.get("/", async (req, res) => {
  try {
    const data = await Student.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch records" });
  }
});

// READ single student by ID
router.get("/:id", async (req, res) => {
  try {
    const data = await Student.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch record" });
  }
});

// UPDATE student by ID
router.put("/:id", async (req, res) => {
  try {
    const data = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to update record" });
  }
});

// DELETE student by ID
router.delete("/:id", async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Record Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete record" });
  }
});

module.exports = router;