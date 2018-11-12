;(function() {

  // Geolocator position is found/resolved
  // Pass lat & lon to dynamically calculate URI
  const resolved = (position) => {
    const coords = position.coords;
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    document.getElementById('lat').innerHTML = '<b>Your Latitude: </b>' + lat.toFixed(2) + '&nbsp;';
    document.getElementById('lon').innerHTML = '<b>Your Longitude: </b>' + lon.toFixed(2) + '&nbsp;';

    const apiUri = {
      pointForecast: `https://api.weather.gov/points/${lat}%2C${lon}/forecast`,
      nearestStations: `https://api.weather.gov/points/${lat}%2C${lon}/stations`
    };

    retrieveWeatherForecast(apiUri.pointForecast);
    retrieveNearestStations(apiUri.nearestStations);
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
  const retrieveWeatherForecast = async (apiUrl) => {
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


  // Fetch Nearest ASOS Stations
  const retrieveNearestStations = async (uri) => {
    const response = await fetch(uri);
    
    if (response.ok) {
      const data = await response.json();
      const stationName = data.features[0].properties.name;
      const stationId = data.features[0].properties.stationIdentifier;
      retrieveCurrentConditions(stationId, stationName);
    } else {
      throw new Error('Cannot retrieve data');
    }
  };


  // Fetch Current Conditions
  const retrieveCurrentConditions = async (stationId, stationName) => {
    const uri = `https://api.weather.gov/stations/${stationId}/observations/latest`;
    const response = await fetch(uri);

    if (response.ok) {
      let data = await response.json();
      data = data.properties;

      document.getElementById(`stationName`).innerHTML = stationName;
      document.getElementById(`phrase`).innerHTML = data.textDescription;
      document.getElementById(`tempNow`).innerHTML = `${ convertTemperature(data.temperature.value).fahrenheit }&deg;`;
    
      if (data.heatIndex.value) {
        document.getElementById(`feelsLike`).innerHTML = `${ convertTemperature(data.heatIndex.value).fahrenheit }&deg;`;
      } else if (data.windChill.value) {
        document.getElementById(`feelsLike`).innerHTML = `${ convertTemperature(data.windChill.value).fahrenheit }&deg;`;
      } else if (!data.heatIndex.value && !data.windChill.value) {
        document.getElementById(`feelsLike`).innerHTML = `${ convertTemperature(data.temperature.value).fahrenheit }&deg;`;
      } else {
        document.getElementById(`feelsLike`).innerHTML = 'Not available';
      }
    
      document.getElementById(`dewpoint`).innerHTML = `${ convertTemperature(data.dewpoint.value).fahrenheit }&deg;`;
      document.getElementById(`windNow`).innerHTML = `${ convertDirection(data.windDirection.value) } ${ convertMsToMph(data.windSpeed.value) } mph`;
      document.getElementById(`lastUpdated`).innerHTML = convertToTime(data.timestamp);

    } else {
      throw new Error(JSON.stringify(`Cannot retrieve data`));
    }
  };


  // Run browser geolocation API
  document.getElementById('find-me').addEventListener('click', () => {
    navigator.geolocation.getCurrentPosition(resolved, err, options);
  });

})();