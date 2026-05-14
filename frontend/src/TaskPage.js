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

  const [weather, setWeather] = useState({});

  // ===== FETCH TASKS + WEATHER =====
  useEffect(() => {

    if (!currentUser) return;

    // ===== FETCH TASKS =====
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

    // ===== FETCH WEATHER =====
    const fetchWeather = async () => {

      try {

        if (!currentUser.location) {
          console.log("No location found");
          return;
        }

        const API_KEY = "2a1f9da9cd2ae5feafb7ffb754481513";

        const res = await axios.get(
          "https://api.openweathermap.org/data/2.5/forecast",
          {
            params: {
              q: currentUser.location,
              appid: API_KEY,
              units: "metric",
            },
          }
        );

        console.log("FORECAST DATA:", res.data);

        setWeather(res.data);

      } catch (err) {

        console.log(
          "WEATHER ERROR:",
          err.response?.data || err.message
        );

      }
    };

    fetchTasks();
    fetchWeather();

  }, [currentUser]);

  // ===== ADD TASK =====
  const addTask = async () => {

    if (!title.trim()) return;

    try {

      const selectedWeather = getWeatherForDate(date);

      const weatherRecommendation =
        selectedWeather
          ? getWeatherRecommendation(selectedWeather)
          : "";

      const res = await axios.post(
        "http://localhost:5000/tasks",
        {
          title,
          date,
          time,
          priority,
          notes,
          userId: currentUser._id,
          estimatedWeather: weatherRecommendation,
        }
      );

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

  // ===== TOGGLE TASK =====
  const toggleTask = async (id) => {

    try {

      const res = await axios.put(
        `http://localhost:5000/tasks/${id}`
      );

      setTasks(
        tasks.map(task =>
          task._id === id ? res.data : task
        )
      );

    } catch (err) {
      console.log(err);
    }
  };

  // ===== DELETE TASK =====
  const deleteTask = async (id) => {

    try {

      await axios.delete(
        `http://localhost:5000/tasks/${id}`
      );

      setTasks(
        tasks.filter(task => task._id !== id)
      );

    } catch (err) {
      console.log(err);
    }
  };

  // ===== GET WEATHER FOR SPECIFIC DATE =====
  const getWeatherForDate = (selectedDate) => {

    if (!weather.list || !selectedDate) return null;

    const selectedDay =
      new Date(selectedDate).toDateString();

    const matchingForecasts =
      weather.list.filter(item => {

        const forecastDay =
          new Date(item.dt * 1000).toDateString();

        return forecastDay === selectedDay;
      });

    if (matchingForecasts.length === 0) {
      return null;
    }

    return matchingForecasts[0];
  };

  // ===== DAILY FORECASTS =====
  const getDailyForecasts = (forecastList) => {

    const grouped = {};

    forecastList.forEach(item => {

      const day =
        new Date(item.dt * 1000).toDateString();

      if (!grouped[day]) {
        grouped[day] = [];
      }

      grouped[day].push(item);
    });

    return Object.keys(grouped)
      .slice(0, 5)
      .map(day => {

        const items = grouped[day];

        const temps =
          items.map(item => item.main.temp);

        return {
          day,
          representative: items[0],
          minTemp: Math.min(...temps),
          maxTemp: Math.max(...temps),
        };
      });
  };

  // ===== WEATHER RECOMMENDATIONS =====
  const getWeatherRecommendation = (weatherData) => {

    if (!weatherData) return "";

    const temp = weatherData.main.temp;

    const condition =
      weatherData.weather[0].main;

    let recommendation = "Good weather conditions";

    if (temp > 30) {
      recommendation =
        "☀️ Very hot - Stay hydrated";
    }

    if (temp < 10) {
      recommendation =
        "❄️ Cold weather - Dress warmly";
    }

    if (condition === "Rain") {
      recommendation =
        "🌧️ Rain expected - Carry umbrella";
    }

    if (condition === "Clouds") {
      recommendation =
        "☁️ Cloudy weather today";
    }

    if (condition === "Clear") {
      recommendation =
        "☀️ Clear skies today";
    }

    return recommendation;
  };

  // ===== TASK FILTERS =====
  const activeTasks =
    tasks.filter(task => !task.completed);

  const completedTasks =
    tasks.filter(task => task.completed);

  // ===== FORECAST DATA =====
  const dailyForecasts =
    weather.list
      ? getDailyForecasts(weather.list)
      : [];

  const currentWeather =
    dailyForecasts[0]?.representative || null;

  const selectedDateWeather =
    getWeatherForDate(date);

  return (

    <div className="task-container">

      {/* ===== WEATHER ===== */}
      {currentWeather && (

        <div className="weather-card">

          <h2>🌤 Today's Weather</h2>

          <p>
            <b>Location:</b>{" "}
            {weather.city?.name},
            {" "}
            {weather.city?.country}
          </p>

          <p>
            <b>Temperature:</b>{" "}
            {Math.round(currentWeather.main.temp)}°C
          </p>

          <p>
            <b>Condition:</b>{" "}
            {currentWeather.weather[0].description}
          </p>

          <p>
            <b>Recommendation:</b>{" "}
            {getWeatherRecommendation(currentWeather)}
          </p>

          {/* ===== WEEKLY FORECAST ===== */}
          <div className="weekly-forecast">

            <h3>📅 Weekly Forecast</h3>

            <div className="weekly-forecast-list">

              {dailyForecasts.map(day => (

                <div
                  key={day.day}
                  className="forecast-day"
                >

                  <p>
                    <b>
                      {new Date(day.day).toLocaleDateString(
                        "en-US",
                        { weekday: "short" }
                      )}
                    </b>
                  </p>

                  <p style={{ fontSize: "28px" }}>
                    {day.representative.weather[0].main === "Rain" ? "🌧️" :
                     day.representative.weather[0].main === "Clouds" ? "☁️" :
                     day.representative.weather[0].main === "Clear" ? "☀️" :
                     "🌤️"}
                  </p>

                  <p>
                    {Math.round(day.minTemp)}°
                    {" / "}
                    {Math.round(day.maxTemp)}°
                  </p>

                </div>

              ))}

            </div>

          </div>

        </div>

      )}

      {/* ===== HEADER ===== */}
      <header className="task-header">

        <h1>Task Manager</h1>

        <p>
          Organize your work and manage priorities efficiently
        </p>

      </header>

      {/* ===== TASK FORM ===== */}
      <div className="task-form">

        <div className="form-group">

          <label>Task Title</label>

          <input
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />

        </div>

        <div className="form-group">

          <label>Date</label>

          <input
            type="date"
            value={date}
            onChange={(e) =>
              setDate(e.target.value)
            }
          />

        </div>

        <div className="form-group">

          <label>Time</label>

          <input
            type="time"
            value={time}
            onChange={(e) =>
              setTime(e.target.value)
            }
          />

        </div>

        <div className="form-group">

          <label>Priority</label>

          <select
            value={priority}
            onChange={(e) =>
              setPriority(e.target.value)
            }
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

        </div>

        <div className="form-group full-width">

          <label>Notes</label>

          <textarea
            rows="3"
            value={notes}
            onChange={(e) =>
              setNotes(e.target.value)
            }
          />

        </div>

        {/* ===== WEATHER FOR SELECTED DATE ===== */}
        {selectedDateWeather && (

          <div className="weather-forecast-box">

            <h3>📅 Weather For Selected Date</h3>

            <p>
              <b>Temperature:</b>{" "}
              {Math.round(selectedDateWeather.main.temp)}°C
            </p>

            <p>
              <b>Condition:</b>{" "}
              {selectedDateWeather.weather[0].description}
            </p>

            <p>
              <b>Recommendation:</b>{" "}
              {getWeatherRecommendation(selectedDateWeather)}
            </p>

          </div>

        )}

        <button
          onClick={addTask}
          className="add-btn"
        >
          Add Task
        </button>

      </div>

      {/* ===== ACTIVE TASKS ===== */}
      <section>

        <h2>Active Tasks</h2>

        {activeTasks.map(task => (

          <div
            key={task._id}
            className="task-card"
          >

            <div>

              <p>
                <b>Title:</b> {task.title}
              </p>

              <p>
                <b>Date:</b> {task.date}
              </p>

              <p>
                <b>Time:</b> {task.time}
              </p>

              <p>
                <b>Priority:</b> {task.priority}
              </p>

              <p>
                <b>Notes:</b> {task.notes}
              </p>

              {task.estimatedWeather && (
                <p>
                  <b>Weather:</b>{" "}
                  {task.estimatedWeather}
                </p>
              )}

            </div>

            <div className="task-actions">

              <button
                onClick={() =>
                  toggleTask(task._id)
                }
              >
                Complete
              </button>

              <button
                onClick={() =>
                  deleteTask(task._id)
                }
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </section>

      {/* ===== COMPLETED TASKS ===== */}
      <section>

        <h2>Completed Tasks</h2>

        {completedTasks.map(task => (

          <div
            key={task._id}
            className="task-card completed-task"
          >

            <div>

              <h3>{task.title}</h3>

              {task.estimatedWeather && (
                <p>
                  <b>Weather:</b>{" "}
                  {task.estimatedWeather}
                </p>
              )}

            </div>

            <div className="task-actions">

              <button
                onClick={() =>
                  toggleTask(task._id)
                }
              >
                Undo
              </button>

              <button
                onClick={() =>
                  deleteTask(task._id)
                }
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