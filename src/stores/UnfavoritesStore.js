var alt = require('../alt');
var LocationActions = require('../actions/LocationActions');

class UnfavoritesStore {
  constructor() {
    this.locations = [];

    this.bindListeners({
      addUnfavoriteLocation: LocationActions.UNFAVORITE_LOCATION
    });
  }

  addUnfavoriteLocation(location) {
    this.locations.push(location);
  }
}

module.exports = alt.createStore(UnfavoritesStore, 'UnfavoritesStore');
