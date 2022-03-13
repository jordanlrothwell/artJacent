const fetch = require("node-fetch");
require("dotenv").config();

const URLbase = "https://api.tomtom.com/search/2/geocode/";
const URLstem = `.json?storeResult=false&countrySet=AU&view=Unified&key=`;
const apiKey = "Nb6yeAUhcbqCYWfTg0Q980Ek8XViGDYz";

const geoparse = async function (query) {
  const URL = `${URLbase}${query}${URLstem}${apiKey}`;

  const locationJSON = await fetch(URL);
  const locationObj = await locationJSON.json();
  
  const coordinates = locationObj.results[0].position;
  const address = locationObj.results[0].address.freeformAddress;

  console.log(coordinates, address)
}

geoparse("newcastle");
