const express = require('express');
const router = express.Router();

const { ApiRequest } = require('./../middleware/fetch');

router.get('/', (req, res, next) => {
  res.render('forecasts', {
    title: 'Geocoded Weather Sample',
    layout: 'layout.hbs'
  });
});

router.post('/:lat,:lon', async (req, res, next) => {
  const lat = req.params.lat;
  const lon = req.params.lon;

  const nwsPointForecast = new ApiRequest(`https://api.weather.gov/points/${lat}%2C${lon}/forecast`);

  try {
    res.json(await nwsPointForecast.get())
  } catch(error) {
    res.status(404).end();
  }
});

module.exports = router;