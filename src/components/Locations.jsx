var React = require('react');
var AltContainer = require('alt/AltContainer');
var LocationStore = require('../stores/LocationStore');
var FavoritesStore = require('../stores/FavoritesStore');
var UnfavoritesStore = require('../stores/UnfavoritesStore');
var LocationActions = require('../actions/LocationActions');

var Favorites = React.createClass({
  render() {
    return (
      <ul>
        {this.props.locations.map((location, i) => {
          return (
            <li key={i}>{location.name}</li>
          );
        })}
      </ul>
    );
  }
});

var Unfavorites = React.createClass({
  render() {
    return (
      <ul>
        {this.props.locations.map((location, i) => {
          return (
            <li key={i}>{location.name}</li>
          );
        })}
      </ul>
    );
  }
});

var AllLocations = React.createClass({
  addFave(ev) {
    var location = LocationStore.getLocation(
      Number(ev.target.getAttribute('data-id'))
    );
    LocationActions.favoriteLocation(location);
  },

  addUnfave(ev) {
    var location = LocationStore.getLocation(
      Number(ev.target.getAttribute('data-id'))
    );
    LocationActions.unfavoriteLocation(location);
  },

  render() {
    if (this.props.errorMessage) {
      return (
        <div>{this.props.errorMessage}</div>
      );
    }

    if (LocationStore.isLoading()) {
      return (
        <div>
          <img src="ajax-loader.gif" />
        </div>
      )
    }

    return (
      <ul>
        {this.props.locations.map((location, i) => {
          var faveButton = (
            <button onClick={this.addFave} data-id={location.id}>
              Favorite
            </button>
          );

          var unfaveButton = (
            <button onClick={this.addUnfave} data-id={location.id}>
              Unfavorite
            </button>
          );

          return (
            <li key={i}>
              {location.name} {location.has_favorite ? '<3' : faveButton} {location.has_unfavorite ? ':(' : unfaveButton}
            </li>
          );
        })}
      </ul>
    );
  }
});

var Locations = React.createClass({
  componentDidMount() {
    LocationStore.fetchLocations();
  },

  render() {
    return (
      <div>
        <h1>Locations</h1>
        <AltContainer store={LocationStore}>
          <AllLocations />
        </AltContainer>

        <h1>Favorites</h1>
        <AltContainer store={FavoritesStore}>
          <Favorites />
        </AltContainer>

        <h1>Unfavorites</h1>
        <AltContainer store={UnfavoritesStore}>
          <Unfavorites />
        </AltContainer>
      </div>
    );
  }
});

module.exports = Locations;
