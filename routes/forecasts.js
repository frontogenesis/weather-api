const express = require('express');
const router = express.Router();

const { ApiRequest } = require('./../middleware/fetch');

router.get('/', (req, res, next) => {
  res.render('forecasts', {
    title: 'Geocoded Weather Sample',
    layout: 'layout.hbs'
  });
});

router.get('/baron', (req, res, next) => {
  res.render('baron', {
    title: 'Baron API Weather Samples',
    layout: 'layout.hbs'
  });
});

router.get('/:lat,:lon', async (req, res, next) => {
  const lat = req.params.lat;
  const lon = req.params.lon;

  const nwsPointForecast = new ApiRequest(`https://api.weather.gov/points/${lat}%2C${lon}/forecast`);

  try {
    res.json(await nwsPointForecast.get())
  } catch(error) {
    res.status(404).end();
  }
});

router.get('/ndfd/:lat,:lon', async (req, res) => {
  const lat = req.params.lat
  const lon = req.params.lon

  const ndfdPointForecast = new ApiRequest(`https://graphical.weather.gov/xml/sample_products/browser_interface/ndfdXMLclient.php?lat=${lat}&lon=${lon}&product=time-series&maxt=maxt&mint=mint&pop12=pop12&qpf=qpf&snow=snow`)

  try {
    res.send(await ndfdPointForecast.getXML())
  } catch(error) {
    res.status(404).end()
  }
})

module.exports = router;