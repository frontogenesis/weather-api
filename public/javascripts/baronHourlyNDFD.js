const getBaronNDFDHourly = async () => {
  const uri = `/json/baron_ndfd_hourly.json`;
  const response = await fetch(uri);

  if (response.ok) {
    let data = await response.json();
    return data.pointforecast_hourly.data;
  } else {
    throw new Error(JSON.stringify({ message: 'Unable to retrieve data' }));
  }
};

getBaronNDFDHourly().then((data) => {
  data.forEach((data, fhr) => {
    document.getElementById(`fhr${fhr}`).innerHTML = convertToHour(data.valid_begin);
    document.getElementById(`icon${fhr}`).innerHTML = 'Not Yet!'
    document.getElementById(`wx${fhr}`).innerHTML = data.weather_code.text;
    document.getElementById(`temp${fhr}`).innerHTML = convertTemperature(data.temperature.value).fahrenheit;
    document.getElementById(`pop${fhr}`).innerHTML = `${ data.precipitation.probability.value }%`
    document.getElementById(`wind${fhr}`).innerHTML = `${ convertDirection(data.wind.dir).short } ${ convertMsToMph(data.wind.speed) }`;
  });
}).catch((error) => {
  console.log(error);
})