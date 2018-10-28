const express = require('express');
const router = express.Router();

const { ApiRequest } = require('./../middleware/fetch');

const weatherstem = new ApiRequest();

router.get('/', (req, res, next) => {
  res.send('This is WeatherSTEM Endpoint');
});

router.get('/stations', (req, res, next) => {
  
  weatherstem.get('https://cdn.weatherstem.com/orangestem/data/dynamic/orangestem.json')
    .then(data => res.json(data))
    .catch(() => res.status(404).json({message: 'No data found'}));
});

router.get('/stations/:id', (req, res, next) => {
  const id = req.params.id;

  weatherstem.post('https://leon.weatherstem.com/api', {
  api_key: process.env.WEATHERSTEM_SECRET, stations: [id]
})
  .then((data) => {
    res.json({
      stationName: data[0].station.name, 
      temperature: data[0].record.readings[2].value, 
      tempUnitSymbol: data[0].record.readings[2].unit_symbol, 
      camera: data[0].station.cameras[0].image
    });
  })
  .catch(() => res.status(404).json({message: 'Unable to find that station'}));
});

module.exports = router;