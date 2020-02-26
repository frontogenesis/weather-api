const express = require('express')
const router = express.Router()

const { ApiRequest } = require('./../middleware/fetch')

router.get('/', (_, res) => {
  res.send('Alerts Endpoint')
})

router.get('/:lat,:lon', async (req, res) => {
  const [lat, lon] = [req.params.lat, req.params.lon]
  const alertsApi = new ApiRequest(`https://api.weather.gov/alerts/active?status=actual&message_type=alert,update&point=${lat},${lon}`)
  const alerts = await alertsApi.get()

  try {
    res.json(alerts)
  } catch (error) {
    res.status(500).end()
  }
})

router.get('/:state', async (req, res) => {
  const state = req.params.state.toUpperCase()
  const alertsApi = new ApiRequest(`https://api.weather.gov/alerts/active/area/${state}`)
  
  try {
    res.json(await alertsApi.get())
  } catch(error) {
    res.status(500).end()
  }
})

module.exports = router