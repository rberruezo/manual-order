## Alt

* Unidirectional data flow: Actions -> Stores -> Views
* Stores have no setters
* Inversion of control
* Single central dispatcher
* All Stores receive the dispatch

### Topical Guide

First we install alt through npm. Although alt is also available through bower.

```sh
npm install alt
```

### Creating Actions

Actions are the way you update state. They're kind of a big deal.

Remember, dispatch only takes one argument. Therefore, if you need to pass multiple arguments into a store you can use an Object.

eg:
```js
class LocationActions {
  updateLocation(x, y) {
    return { x, y };
  }
}
```

### Stores

Stores are where you keep a part of your application's state.

You can define your stores as a class/constructor-prototype or as an Object.

Store instances returned by `alt.createStore` can be listened to for updates by calling `listen`. `listen` is meant to be used by your View components in order to await changes made to each store. It returns a function you can use to un-listen to your store. Alternatively, you can use the `unlisten` method. It takes in the same function you used for `listen` and unregisters it.

Another important method is `getState`, which returns a copy of the current store's state.

All defined methods in your Store class will not be available on the store instance. They are accessible within the class but not on the returned Object via `alt.createStore`. This ensures that stores have no direct setters and the state remains mutable only through actions keeping the flow unidirectional. If you want to attach public/static functions to your store the recommended method is to call the `exportPublicMethods` method from the constructor. An alternative is to declare the method as static, which will cause alt to expose the method on the store.

### Canceling An Event

If you don't want the store to inform the view of an action you can call `this.preventDefault()` (or you can return false) from inside an action handler method.

### Constants

They're automagically created. Feel free to use them to bind your actions or use the method itself, whatever reads better.

### Listening To Multiple Actions

```js
class LocationStore {
  constructor() {
    this.bindListeners({
      handleCity: locationActions.updateCity,
      handleCountry: [locationActions.updateCountry, locationActions.updateLatLng]
    });
  }

  handleCity(data) {
    // will only be called by locationActions.updateCity()
  }

  handleCountry(data) {
    // will be called by locationActions.updateCountry() and locationActions.updateLatLng()
  }
}
```

Alternatively, you can bind all the actions inside locationActions using the shortcut `bindActions`.

```js
class LocationStore {
  constructor() {
    this.bindActions(locationActions);

    this.state = {
      city: 'Austin',
      country: 'US'
    };
  }

  onUpdateCity(city) {
    this.setState({ city });
  }

  onUpdateCountry(country) {
    this.setState({ country });
  }
}
```

Actions who have a `onCamelCasedAction` method or an `actionName` method available in the store will be bound. In this example `locationActions.updateCity` will be handled by `onUpdateCity`. There is no difference between calling the action handler `updateCity` or `onUpdateCity` it's just a matter of aesthetic preference.

### Managing Store Data Dependencies

`waitFor` is mostly an alias to Flux's Dispatcher waitFor.

You can `waitFor` multiple stores by passing in an Array:

```js
this.waitFor([store1.dispatchToken, store2.dispatchToken])
```

### Views

Your choice of view isn't important to alt. What's important is to know how the view consumes the store's data, and that is via event listeners.

### Full Circle

Restart the loop by making your views kick off new actions.

*Source: https://github.com/goatslacker/alt*