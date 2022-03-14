const fetch = require("node-fetch");
require("dotenv").config();

// URL components in case modification required in future
// API key is stored in the file so the app is usable when deployed
const URLbase = "https://api.tomtom.com/search/2/geocode/";
const URLstem = `.json?storeResult=false&countrySet=AU&view=Unified&key=`;
const apiKey = "Nb6yeAUhcbqCYWfTg0Q980Ek8XViGDYz";

const geoparse = async function (query) {
  // create the URL based on user input
  const URL = `${URLbase}${query}${URLstem}${apiKey}`;

  // make a call to the API and parse into a js object
  const locationJSON = await fetch(URL);
  const locationObj = await locationJSON.json();

  // store the results
  const coordinates = locationObj.results[0].position;
  const address = locationObj.results[0].address.freeformAddress;

  // return an object with the results as its values
  const geoparseObj = { coordinates: coordinates, address: address };
  return geoparseObj;
};

module.exports = geoparse;
