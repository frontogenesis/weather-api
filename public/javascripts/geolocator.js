;(function() {

  // Geolocator position is found/resolved
  // Pass lat & lon to dynamically calculate URI
  const resolved = (position) => {
    const coords = position.coords;
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    document.getElementById('lat').innerHTML = '<b>Your Latitude: </b>' + lat.toFixed(2) + '&nbsp;';
    document.getElementById('lon').innerHTML = '<b>Your Longitude: </b>' + lon.toFixed(2) + '&nbsp;';

    const apiUrl = `https://api.weather.gov/points/${lat}%2C${lon}/forecast`;

    retrieveWeatherData(apiUrl);
  };

  // Log the error to console (for now)
  const err = (error) => {
    console.log(error.message);
  };

  // Set geolocator options
  const options = {
    enableHighAccuracy: false,
    timeout: 10000,
    maximumAge: 0
  };

  // Fetch weather data from server and populate DOM
  const retrieveWeatherData = async (apiUrl) => {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.properties) {

      // Return entire forecast
      const renderForecastFull = () => {
        let fullForecast = '';
        data.properties.periods.forEach((period) => fullForecast += (`<p><b>${period.name}:</b> ${period.detailedForecast}</p>`));
        document.getElementById('detailedFcst').innerHTML = fullForecast;

        return detailedForecast;
      };

      // Return only parts of the forecast
      const renderForecastPeriods = (start, end) => {
        let forecastSnippet = '';
        
        for (let period = start; period < end; period++) {
          forecastSnippet += `<p><b>${data.properties.periods[period].name}:</b> ${data.properties.periods[period].detailedForecast}</p>`;
        }

        return forecastSnippet;
      };
      
      document.getElementById('detailedFcst').innerHTML = renderForecastPeriods(0, 4);

      const icon = data.properties.periods[0].icon;
      document.getElementById('quick-cast').innerHTML = data.properties.periods[0].name;
      document.getElementById('temperature').innerHTML = '<b>Temp: </b>' + data.properties.periods[0].temperature + '&deg;';
      document.getElementById('wdir').innerHTML = '<b>Wind: </b>' + data.properties.periods[0].windDirection + '&nbsp;';
      document.getElementById('wspd').innerHTML = data.properties.periods[0].windSpeed;
      document.getElementById('sky').setAttribute('src', icon);

    } else {
      document.getElementById('detailedFcst').innerText = 'Forecast unavailable';
    }
  };

  // Run browser geolocation API
  document.getElementById('find-me').addEventListener('click', () => {
    navigator.geolocation.getCurrentPosition(resolved, err, options);
  });

})();