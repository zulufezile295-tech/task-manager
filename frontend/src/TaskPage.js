import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function TaskPage({ currentUser }) {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [priority, setPriority] = useState("Low");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (!currentUser) return;

    const fetchTasks = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/tasks/${currentUser._id}`
        );
        setTasks(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchTasks();
  }, [currentUser]);

  // ===== ADD TASK =====
  const addTask = async () => {
    if (!title.trim()) return;

    console.log("Sending to backend:", {
      title,
      date,
      time,
      priority,
      notes,
      userId: currentUser._id,
    });

    try {
      const res = await axios.post("http://localhost:5000/tasks", {
        title,
        date,
        time,
        priority,
        notes,
        userId: currentUser._id,
      });

      setTasks([...tasks, res.data]);

      setTitle("");
      setTime("");
      setDate("");
      setPriority("Low");
      setNotes("");
    } catch (err) {
      console.log(err);
    }
  };

  // ===== TOGGLE COMPLETE =====
  const toggleTask = async (id) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/tasks/${id}`
      );

      setTasks(tasks.map(task =>
        task._id === id ? res.data : task
      ));
    } catch (err) {
      console.log(err);
    }
  };

  // ===== DELETE =====
  const deleteTask = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/tasks/${id}`
      );
      setTasks(tasks.filter(task => task._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const activeTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  return (
    <div className="task-container">
      <header className="task-header">
        <h1>Task Manager</h1>
        <p>Organize your work and manage priorities efficiently</p>
      </header>

      {/* FORM */}
      <div className="task-form">
        <div className="form-group">
          <label>Task Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Time</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div className="form-group full-width">
          <label>Notes (Optional)</label>
          <textarea
            rows="3"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add extra details about this task..."
          />
        </div>

        <button onClick={addTask} className="add-btn">
          Add Task
        </button>
      </div>

      {/* ACTIVE TASKS */}
      <section>
        <h2>Active Tasks</h2>
        {activeTasks.map(task => (
          <div
            key={task._id}
            className={`task-card priority-${task.priority.toLowerCase()}`}
          >
            <div className="task-info">
              <h3>{task.title}</h3>

              <div className="task-meta">
                {task.date && <span>Date: {task.date}</span>}
                {task.time && <span>Time: {task.time}</span>}
                {task.priority && <span>Priority: {task.priority}</span>}
              </div>

              {task.notes && (
                <div className="task-notes">
                  <strong>Notes:</strong> {task.notes}
                </div>
              )}
            </div>

            <div className="task-actions">
              <button
                onClick={() => toggleTask(task._id)}
                className="complete-btn"
              >
                Mark Completed
              </button>

              <button
                onClick={() => deleteTask(task._id)}
                className="delete-btn"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* COMPLETED TASKS */}
      <section>
        <h2>Completed Tasks</h2>
        {completedTasks.map(task => (
          <div key={task._id} className="task-card completed-task">
            <div className="task-info">
              <h3>{task.title}</h3>

              <div className="task-meta">
                {task.date && <span>Date: {task.date}</span>}
                {task.time && <span>Time: {task.time}</span>}
                {task.priority && <span>Priority: {task.priority}</span>}
              </div>

              {task.notes && (
                <div className="task-notes">
                  <strong>Notes:</strong> {task.notes}
                </div>
              )}
            </div>

            <div className="task-actions">
              <button
                onClick={() => toggleTask(task._id)}
                className="undo-btn"
              >
                Undo
              </button>

              <button
                onClick={() => deleteTask(task._id)}
                className="delete-btn"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default TaskPage;