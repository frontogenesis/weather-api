const express = require('express')
const router = express.Router()

const { getCache } = require('../middleware/redis')
const { ApiRequest } = require('../middleware/fetch')

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
  
  try {
    const alertsApi = new ApiRequest(`https://api.weather.gov/alerts/active/area/${state}`)

    let allAlerts = await alertsApi.get()
    allAlerts = allAlerts.features
    let newAlerts = await getCache('alerts', allAlerts)
    
    res.status(200).json({
      allAlerts,
      newAlerts
    })
  } catch(error) {
    res.status(500).end()
  }
})

module.exports = router