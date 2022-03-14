const suburbsByState = require("./suburbsByState");

const randomSuburb = function () {
  const stateIndex = Math.floor(Math.random() * 7);
  const stateObj = suburbsByState[stateIndex];
  const suburbIndex = Math.floor(Math.random() * stateObj.suburbs.length);
  const chosenState = stateObj.state;
  const chosenSuburb = stateObj.suburbs[suburbIndex];
  return `${chosenSuburb}, ${chosenState}`;
};

module.exports = randomSuburb;
