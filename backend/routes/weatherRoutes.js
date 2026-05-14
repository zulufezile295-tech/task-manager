const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/:city", async (req, res) => {
  try {
    const city = req.params.city;

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY&units=metric`
    );

    res.json(response.data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Weather fetch failed" });
  }
});

module.exports = router;