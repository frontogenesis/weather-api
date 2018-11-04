const express = require('express');
const router = express.Router();

const { ApiRequest } = require('./../middleware/fetch');

router.get('/', (req, res, next) => {
  res.send('Alerts Endpoint');
});

router.get('/:state', async (req, res, next) => {
  const state = req.params.state.toUpperCase();
  const alertsApi = new ApiRequest(`https://api.weather.gov/alerts/active/area/${state}`);
  
  try {
    res.json(await alertsApi.get());
  } catch(error) {
    res.status(404).end();
  }
});

module.exports = router;