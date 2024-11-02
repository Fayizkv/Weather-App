const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.API_KEY;

// Function to get weather data
async function getWeather(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    try {
        const response = await axios.get(url);
        return {
            city: response.data.name,
            temperature: response.data.main.temp,
            weather: response.data.weather[0].description,
            humidity: response.data.main.humidity,
            windSpeed: response.data.wind.speed
        };
    } catch (error) {
        console.error(`Error fetching weather data: ${error.message}`);
        return null;
    }
}

/* GET home page. */
router.get('/', async function(req, res, next) {
    const weatherData = await getWeather('Kochi'); // Default to Kochi
    res.render('index', { weatherData });
});

/* GET weather data based on city */
router.get('/weather', async function(req, res, next) {
    const city = req.query.city || 'Kochi'; // Use query parameter or default to Kochi
    const weatherData = await getWeather(city);

    if (weatherData) {
        res.json(weatherData); // Send weather data as JSON
    } else {
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

module.exports = router;
