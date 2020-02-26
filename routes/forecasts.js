const express = require('express')
const router = express.Router()

const { ApiRequest } = require('./../middleware/fetch')

router.get('/', (_, res) => {
  res.render('forecasts', {
    title: 'Geocoded Weather Sample',
    layout: 'layout.hbs'
  })
})

router.get('/baron', (_, res) => {
  res.render('baron', {
    title: 'Baron API Weather Samples',
    layout: 'layout.hbs'
  })
})

router.get('/hourly/:lat,:lon', async (req, res) => {
  const [lat, lon] = [req.params.lat, req.params.lon]
  
  let getPointMetadata = new ApiRequest(`https://api.weather.gov/points/${lat},${lon}`)
  getPointMetadata = await getPointMetadata.get()

  const nwsForecastHourlyUrl = getPointMetadata.properties.forecastHourly
  let nwsForecastHourly = new ApiRequest(nwsForecastHourlyUrl)
  nwsForecastHourly = await nwsForecastHourly.get()
  nwsForecastHourly = nwsForecastHourly.properties

  try {
    res.json(nwsForecastHourly)
  } catch(error) {
    res.status(500).end()
  }
})

router.get('/:lat,:lon', async (req, res) => {
  const [lat, lon] = [req.params.lat, req.params.lon]
  
  let getPointMetadata = new ApiRequest(`https://api.weather.gov/points/${lat},${lon}`)
  getPointMetadata = await getPointMetadata.get()

  const nwsForecastUrl = getPointMetadata.properties.forecast
  let nwsForecast = new ApiRequest(nwsForecastUrl)
  nwsForecast = await nwsForecast.get()
  nwsForecast = nwsForecast.properties

  try {
    res.json(nwsForecast)
  } catch(error) {
    res.status(500).end()
  }
})

router.get('/grid/:lat,:lon', async (req, res) => {
  const [lat, lon] = [req.params.lat, req.params.lon]
  
  let getPointMetadata = new ApiRequest(`https://api.weather.gov/points/${lat},${lon}`)
  getPointMetadata = await getPointMetadata.get()

  const nwsGridForecastUrl = getPointMetadata.properties.forecastGridData
  let nwsGridForecast = new ApiRequest(nwsGridForecastUrl)
  nwsGridForecast = await nwsGridForecast.get()
  nwsGridForecast = nwsGridForecast.properties

  try {
    res.json(nwsGridForecast)
  } catch(error) {
    res.status(500).end()
  }
})

router.get('/ndfd/:lat,:lon', async (req, res) => {
  const [lat, lon] = [req.params.lat, req.params.lon]

  const ndfdPointForecast = new ApiRequest(`https://graphical.weather.gov/xml/sample_products/browser_interface/ndfdXMLclient.php?lat=${lat}&lon=${lon}&product=time-series&maxt=maxt&mint=mint&pop12=pop12&qpf=qpf&snow=snow`)

  try {
    res.send(await ndfdPointForecast.getXML())
  } catch(error) {
    res.status(500).end()
  }
})

router.get('/convoutlook/?lat=:lat&?lon=:lon&?distance=:distance', async (req, res) => {
  const [lat, lon] = [req.params.lat, req.params.lon]
  const distance = req.params.distance

  // Calculate UTC Dates
  const d = new Date()
  let dateToday = d.setDate(d.getDate())
  dateToday = new Date(dateToday)
  let datePlus3Days = d.setDate(d.getDate() + 3)
  datePlus3Days = new Date(datePlus3Days)

  const spcOutlook = new ApiRequest(`https://graphical.weather.gov/xml/sample_products/browser_interface/ndfdXMLclient.php?centerPointLat=${lat}&centerPointLon=${lon}&distanceLat=${distance}&distanceLon=${distance}&resolutionSquare=20.0&product=time-series&begin=${dateToday}&end=${datePlus3Days}&conhazo=conhazo`)

  try {
    res.send(await spcOutlook.getXML())
  } catch(error) {
    res.status(500).end()
  }
})

module.exports = router