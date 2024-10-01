const express = require("express");
const { auth, adminAuth } = require("../middleware/auth");
const Task = require("../models/Task");
const router = express.Router();

// Create a task
router.post("/", auth, async (req, res) => {
  console.log("req", req.body);
  console.log("req", req.user);
  const task = new Task({
    ...req.body,
    createdName: req.user.username,
    createdBy: req.user._id,
  });
  await task.save();
  console.log("task", task);
  res.send(task);
});

// Update a task
router.put("/:id", auth, async (req, res) => {
  try {
    // Log the ID to verify it's coming through
    console.log("id", req.params.id);

    // Find task by ID and update it
    const task = await Task.findByIdAndUpdate(req.params.id, req.body);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Send the updated task as the response
    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Delete a task
router.delete("/:id", auth, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.send("Task deleted");
});

// View tasks (with pagination, filtering, and search)
router.get("/", auth, async (req, res) => {
  const { status, priority, assignedUser, page = 1, limit = 10 } = req.query;
  const filter = {
    $or: [{ createdBy: req.user._id }, { assignedUser: req.user._id }],
  };

  if (status) filter.status = status;
  if (priority) filter.priority = priority;
  if (assignedUser) filter.assignedUser = assignedUser;

  const tasks = await Task.find(filter)
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  res.send(tasks);
});

// Assign task to a user (Admin only)
router.patch("/:id/assign", [auth], async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    { assignedUser: req.body.assignedUser },
    { new: true }
  );
  res.send(task);
});

module.exports = router;
