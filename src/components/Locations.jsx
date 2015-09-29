var React = require('react');
var AltContainer = require('alt/AltContainer');
var LocationStore = require('../stores/LocationStore');
var FavoritesStore = require('../stores/FavoritesStore');
var UnfavoritesStore = require('../stores/UnfavoritesStore');
var RandomLocationStore = require('../stores/RandomLocationStore');
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

var RandomLocation = React.createClass({
  render() {
    return (
      <h3>{this.props.location ? this.props.location.name : '-'}</h3>
    );
  }
});

var AllLocations = React.createClass({

  componentDidMount() {
    setInterval(function() {
      var location = LocationStore.getLocation(
        Number(Math.floor(Math.random() * (LocationStore.getState().locations.length - 1)))
      );
      LocationActions.setRandomLocation(location);
    }, 1000);
  },

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

        <h1>Random location</h1>
        <AltContainer store={RandomLocationStore}>
          <RandomLocation />
        </AltContainer>
      </div>
    );
  }
});

module.exports = Locations;
