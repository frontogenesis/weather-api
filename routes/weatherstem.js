const express = require('express')
const router = express.Router()

const { ApiRequest } = require('./../middleware/fetch')

router.get('/', (req, res, next) => {
  res.send('This is WeatherSTEM Endpoint')
})

router.get('/stations', async (req, res) => {
  const weatherstem = new ApiRequest('https://cdn.weatherstem.com/dashboard/data/dynamic/dashboard.json')

  try {
    res.json(await weatherstem.get())
  } catch(error) {
    res.status(404).end()
  }
})

router.get('/stations/:id', async (req, res) => {
  const id = req.params.id

  let weatherstem = new ApiRequest('https://cdn.weatherstem.com/dashboard/data/dynamic/dashboard.json')

  try {
    weatherstem = await weatherstem.get()
    const stationData = weatherstem.find(station => id === station.id.split('@')[0])
    res.json(stationData)
  } catch(error) {
    res.status(404).end()
  }
})

module.exports = router