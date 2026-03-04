const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },

  date: {                 // ✅ ADD THIS
    type: String,
  },

  time: {
    type: String,
  },

  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Low",
  },

  notes: {               // ✅ ADD THIS
    type: String,
  },

  completed: {
    type: Boolean,
    default: false,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Task", taskSchema);