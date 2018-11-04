const express = require('express');
const router = express.Router();

const { weatherStemMiddleware } = require('./../middleware/weatherstem');

/* GET home page. */
router.get('/', weatherStemMiddleware, (req, res, next) => {

  const stemData = (stationName) => req.data.filter(station => station.name === stationName);

  const filteredStemData = stemData('University of Florida');

  res.render('index', { 
    title: 'The Wet Microburst API',
    layout: 'layout.hbs',
    stationName: filteredStemData[0].name,
    temperature: filteredStemData[0].observation.temperature,
    windSpeed: Math.round(filteredStemData[0].observation.wind_speed),
    windGust: Math.round(filteredStemData[0].observation.gust),
    cameraName: filteredStemData[0].photos[0].name,
    cameraUrl: filteredStemData[0].photos[0].url
  });
});

module.exports = router;