require('dotenv').config();
const request = require('request');

const ws = process.env.WEATHERSTACK_API;
const mb = process.env.MAPBOX_API

const url = `http://api.weatherstack.com/current?access_key=${ws}&query=37.8267,-122.4233&units=f`;

request({ url: url, json: true }, (error, response) => {
  if (error) {
    console.log('Unable to retrieve data!');
  } else if (response.body.error) {
    console.log('Unable to find location');
  } else {
    const data = response.body.current;
    console.log('It is currently ' + data.weather_descriptions[0]);
    console.log('The temperature is ' + data.temperature + ' and the cloud cover is ' + data.cloudcover + '%');
    console.log('Wind speed is ' + data.wind_speed + '');
  }
});

const geoURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=${mb}`;

request({ url: geoURL, json: true }, (error, response) => {
  if (error) {
    console.log('Unable to retrieve data');
  } else if (response.body.features.length === 0) {
    console.log('Invalid location entry');
  } else {
    const lat = response.body.features[0].center[1];
    const lon = response.body.features[0].center[0];
    console.log(lat, lon);
  }
});
