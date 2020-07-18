require('dotenv').config();
const request = require('request');

const mb = process.env.MAPBOX_API;

const geoCode = (address, callback) => {
  const url =  `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${mb}`;
  request({ url: url, json: true}, (error, response) => {
    if (error) {
      callback('Unable to connect', undefined)
    } else if (response.body.features.length === 0) {
      callback('Location not found', undefined)
    } else {
      callback(undefined, {
         lat: response.body.features[0].center[1],
         lon: response.body.features[0].center[0],
         loc: response.body.features[0].place_name
      })
    }
  })
}

module.exports = geoCode
