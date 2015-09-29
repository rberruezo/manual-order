var alt = require('../alt');
var LocationActions = require('../actions/LocationActions');

class RandomLocationStore {
  constructor() {
    this.location = null;

    this.bindListeners({
      setRandomLocation: LocationActions.SET_RANDOM_LOCATION
    });
  }

  setRandomLocation(location) {
    this.location = location;
  }
}

module.exports = alt.createStore(RandomLocationStore, 'RandomLocation');
