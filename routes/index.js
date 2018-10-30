const express = require('express');
const router = express.Router();

const { weatherStemMiddleware } = require('./../middleware/weatherstem');

/* GET home page. */
router.get('/', weatherStemMiddleware, (req, res, next) => {
  const stationName = req.data[198].name
  const temperature = req.data[198].observation.temperature;
  const windSpeed = Math.round(req.data[198].observation.wind_speed);
  const windGust = Math.round(req.data[198].observation.gust);
  const cameraName = req.data[198].photos[0].name;
  const cameraUrl = req.data[198].photos[0].url;

  res.render('index', { 
    title: 'The Wet Microburst API',
    layout: 'layout.hbs',
    stationName,
    temperature,
    windSpeed,
    windGust,
    cameraName,
    cameraUrl
  });
});

module.exports = router;