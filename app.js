require('dotenv').config();
const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');

let input = process.argv;

if (input[2].length != 0) {
  geoCode(input[2], (error, data) => {
    if (error) {
      return console.log(error);
    };
    forecast(data.lat, data.lon, (error, foredcastData) => {
      if (error) {
        return console.log(error);
      }
      console.log(data.loc);
      console.log(foredcastData);
    });
  });
}


