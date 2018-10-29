const express = require('express');
const router = express.Router();

const { ApiRequest } = require('./../middleware/fetch');

router.get('/', (req, res, next) => {
  res.send('This is WeatherSTEM Endpoint');
});

router.get('/stations', async (req, res, next) => {
  const weatherstem = new ApiRequest('https://cdn.weatherstem.com/orangestem/data/dynamic/orangestem.json');

  try {
    res.json(await weatherstem.get());
  } catch(error) {
    res.status(404).end();
  }
});

router.get('/stations/:id', async (req, res, next) => {
  const id = req.params.id;

  const weatherstem = new ApiRequest('https://leon.weatherstem.com/api');

  try {
    const data = await weatherstem.post({
      api_key: process.env.WEATHERSTEM_SECRET, stations: [id]
    });

    res.json({
      stationName: data[0].station.name, 
      temperature: data[0].record.readings[2].value, 
      tempUnitSymbol: data[0].record.readings[2].unit_symbol, 
      camera: data[0].station.cameras[0].image
    });
  } catch(error) {
    res.status(404).end();
  }
});

module.exports = router;