const express = require("express");
const Task = require("../models/Task");

const router = express.Router();

/*
GET TASKS FOR A SPECIFIC USER
*/
router.get("/:userId", async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.params.userId });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
});


/*

CREATE NEW TASK

*/
router.post("/", async (req, res) => {
  console.log("Request body:", req.body);
  try {
    const { title, date, time, priority, notes, userId } = req.body;

    const newTask = new Task({
      title,
      date,
      time,
      priority,
      notes,
      user: userId,
    });

    const savedTask = await newTask.save();
    console.log("Saved task:", savedTask); // Here, log saved task
    res.status(201).json(savedTask);
  } catch (err) {
    console.log("Error:", err); // Add this to see the error if it occurs
    res.status(500).json({ message: "Error creating task" });
  }
});


/*
=====================================
TOGGLE TASK COMPLETED
=====================================
*/
router.put("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.completed = !task.completed;
    await task.save();

    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: "Error updating task" });
  }
});


/*
=====================================
DELETE TASK
=====================================
*/
router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting task" });
  }
});

module.exports = router;

 