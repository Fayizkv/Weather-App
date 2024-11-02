var express = require('express');
var router = express.Router();
var axios = require('axios');

// Replace with your OpenWeatherMap API key
const API_KEY = '884a40245ea1c19f7f4270e70aafd5e5';
const CITY = 'Kochi';
const UNITS = 'metric'; // Use 'imperial' for Fahrenheit

async function getWeather(city) {
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
            params: {
                q: city,
                appid: API_KEY,
                units: UNITS,
            },
        });

        const weatherData = response.data;
        console.log(`Weather in ${city}:`);
        console.log(`Temperature: ${weatherData.main.temp}°C`);
        console.log(`Weather: ${weatherData.weather[0].description}`);
        console.log(`Humidity: ${weatherData.main.humidity}%`);
        console.log(`Wind Speed: ${weatherData.wind.speed} m/s`);
        
        return weatherData;

    } catch (error) {
        console.error(`Error fetching weather data: ${error.message}`);
        return null;
    }
}

/* GET home page. */
router.get('/', async function(req, res, next) {
  // Wait for getWeather to complete before rendering
  const weatherData = await getWeather(CITY);

  // Now render the page, passing in the weather data if available
  res.render('index', { 
      title: 'Express', 
      weather: weatherData ? `Temperature in ${CITY}: ${weatherData.main.temp}°C` : 'Could not fetch weather data' 
  });
});

module.exports = router;
