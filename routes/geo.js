const express = require('express');
const router = express.Router();

const { ApiRequest } = require('./../middleware/fetch');

router.get('/', (req, res, next) => {
  res.send('Geo Endpoint');
});

router.get('/places/:location', async (req, res, next) => {
  const location = req.params.location;

  let uri = `https://maps.googleapis.com/maps/api/geocode/json?`
  const uriParams = `address=${location}&key=${process.env.GOOGLE_PLACES_KEY}`;
  uri = `${uri}${uriParams}`;
  
  const googlePlaces = new ApiRequest(uri);
  

  try {
    const data = await googlePlaces.get(); 
    res.json({
      lat: data.results[0].geometry.location.lat,
      lon: data.results[0].geometry.location.lng
    })
  } catch(error) {
    res.status(403).end();
  }
});

module.exports = router;