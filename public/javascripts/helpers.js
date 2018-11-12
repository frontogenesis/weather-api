// Convert Temperature from Celsius to Fahrenheit
const convertTemperature = (temperature) => {
  let celsius = Math.round(temperature);
  let fahrenheit = Math.round(temperature * 1.8 + 32);
  return {
      fahrenheit: fahrenheit,
      celsius: celsius
  };
};

// Convert Speed from ms^-1 to mph
const convertMsToMph = (spd) => {
  let speed = Math.round(spd * 2.236936);
  return speed
};

// Convert Wind Direction from degrees to 8-point compass rose
const convertDirection = (wDir) => {
  let direction;
  if (wDir >0 && wDir <=22) {
      direction = 'N'
  }
  else if (wDir >22 && wDir <=67) {
      direction = 'NE'
  }
  else if (wDir >67 && wDir <=112) {
      direction = 'E'
  }
  else if (wDir >112 && wDir <=157) {
      direction = 'SE'
  }
  else if (wDir >157 && wDir <=202) {
      direction = 'S'
  }
  else if (wDir >202 && wDir <=247) {
      direction = 'SW'
  }
  else if (wDir >247 && wDir <=292) {
      direction = 'W'
  }
  else if (wDir >292 && wDir <=337) {
      direction = 'NW'
  }
  else if (wDir >337 && wDir <=360) {
      direction = 'N'
  }
  else if (wDir === 0) {
      direction = null;
  }
  else if (wDir === null) {
      direction = 'Variable'
  }
  else {
      direction = 'Unknown'
  }
  return direction
};

// Get Day of Week
const convertToDayOfWeek = (fullDate) => {
  const day = new Date(fullDate).getDay();

  let dayOfWeek;

  if (day === 0) { 
    dayOfWeek = { long: 'Sunday', short: 'Sun' } 
  }
  else if (day === 1) { 
    dayOfWeek = { long: 'Monday', short: 'Mon' } 
  }
  else if (day === 2) { 
    dayOfWeek = { long: 'Tuesday', short: 'Tue' } 
  }
  else if (day === 3) { 
    dayOfWeek = { long: 'Wednesday', short: 'Wed' } 
  }
  else if (day === 4) { 
    dayOfWeek = { long: 'Thursday', short: 'Thu' }
  }
  else if (day === 5) { 
    dayOfWeek = { long: 'Friday', short: 'Fri' } 
  }
  else if (day === 6) { 
    dayOfWeek = { long: 'Saturday', short: 'Sat' } 
  }
  else { 
    dayOfWeek = { long: 'Unknown', short: 'Null' }
  }

  return dayOfWeek;
};

// Get Hour + AM or PM
const convertToHour = (fullDate) => {
  const hour = new Date(fullDate).getHours();

  let hourOfDay;

  if (hour >= 1 && hour <= 11) {
    hourOfDay = hour + ' AM';
  } else if (hour >= 13 && hour <= 23) {
    hourOfDay = (hour - 12) + ' PM';
  } else if (hour === 12) {
    hourOfDay = hour + ' PM';
  } else if (hour === 0) {
    hourOfDay = hour + ' AM';
  } else {
    hourOfDay = 'Unknown';
  }

  return hourOfDay;
};

// Get Current Time + AM or PM
const convertToTime = (fullDate) => {
  const militaryHour = new Date(fullDate).getHours();
  const mins = new Date(fullDate).getMinutes();

  let hour;
  if (militaryHour >= 13 && militaryHour <= 23) {
    hour = militaryHour - 12;
  } else if (militaryHour === 0 || militaryHour === 12) {
    hour === 12;
  }

  let amOrPm;
  if (militaryHour >= 0 && militaryHour <= 11) {
    amOrPm = ' AM';
  } else if (militaryHour >= 12 && militaryHour <= 23) {
    amOrPm = ' PM';
  } else {
    amOrPm = 'Unknown';
  }

  return `${hour}:${mins} ${amOrPm}`;
};

