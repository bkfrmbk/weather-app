require('dotenv').config();
const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');

let input = process.argv;

if (input[2] != undefined) {
  geoCode(input[2], (error, { lat, lon, loc } = {}) => {
    if (error) {
      return console.log(error);
    };
    forecast(lat, lon, (error, foredcastData) => {
      if (error) {
        return console.log(error);
      }
      console.log(loc);
      console.log(foredcastData);
    });
  });
} else {
  console.log('Please provide an address');
}


