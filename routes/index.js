const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.API_KEY;
const CITY = 'Kochi';

const url = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`;


/* GET home page. */
router.get('/', function(req, res, next){

    axios.get(url).then(response=>{
        console.log(response.data)
    })
});


module.exports = router;
