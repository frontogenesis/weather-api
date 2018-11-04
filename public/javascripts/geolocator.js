;(function() {

  // Geolocator position is found/resolved
  // Pass lat & lon to dynamically calculate URI
  const resolved = (position) => {
    const coords = position.coords;
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    document.getElementById('lat').innerHTML = '<b>Your Latitude: </b>' + lat.toFixed(2) + '&nbsp;';
    document.getElementById('lon').innerHTML = '<b>Your Longitude: </b>' + lon.toFixed(2) + '&nbsp;';

    const apiURL = `https://api.weather.gov/points/${lat}%2C${lon}/forecast`;
    
    retrieveWeatherData(apiURL);
  };

  // Log the error to console (for now)
  const err = (error) => {
    console.log(error.message);
  };

  // Set geolocator options
  const options = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0
  };

  // Fetch weather data from server and populate DOM
  const retrieveWeatherData = async (apiUrl) => {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.properties) {
      // Part 1
      const icon = data.properties.periods[0].icon;
      document.getElementById('temperature').innerHTML = '<b>Temp: </b>' + data.properties.periods[0].temperature + '&deg;';
      document.getElementById('wdir').innerHTML = '<b>Wind: </b>' + data.properties.periods[0].windDirection + '&nbsp;';
      document.getElementById('wspd').innerHTML = data.properties.periods[0].windSpeed;
      document.getElementById('sky').setAttribute('src', icon);
      document.getElementById('daypart').innerHTML = '<b>' + data.properties.periods[0].name + ': </b>';
      document.getElementById('detailedFcst').innerText = data.properties.periods[0].detailedForecast;

      // Part 2
      document.getElementById('daypart2').innerHTML = '<b>' + data.properties.periods[1].name + ': </b>';
      document.getElementById('detailedFcst2').innerText = data.properties.periods[1].detailedForecast;

    } else {
      document.getElementById('detailedFcst').innerText = 'Forecast unavailable';
    }
  };

  // Run browser geolocation API
  document.getElementById('find-me').addEventListener('click', () => {
    navigator.geolocation.getCurrentPosition(resolved, err, options);
  });

})();