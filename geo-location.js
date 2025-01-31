/** Copyright Eric Bidelman <ebidel@gmail.com> */
/* TODO: decide if we need to cache results across instances. */
/**
Geolocation API Polymer web component.

Example to get the device geolocation values:

```html
<geo-location latitude="{{latitude}}" longitude="{{longitude}}"></geo-location>
```

Continuous update the device geolocation values with high accuracy, and center Google Maps map and marker to the current location:

TODO: change the API key to your own.

```html
<geo-location watch-pos high-accuracy latitude="{{latitude}}" longitude="{{longitude}}"></geo-location>

<google-map latitude="[[latitude]]" longitude="[[longitude]]" api-key="AIzaSyD3E1D9b-Z7ekrT3tbhl_dy8DCXuIuDDRc">
  <google-map-marker slot="markers" latitude="[[latitude]]" longitude="[[longitude]]"></google-map-marker>
</google-map>
```

@demo demo/index.html
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
Polymer({
  is: 'geo-location',

  hostAttributes: {
    hidden: true
  },

  properties: {
    /**
     * The latitude of the current position.
     */
    latitude: {
      type: Number,
      notify: true,
      reflectToAttribute: true,
      readOnly: true,
      value: null
    },

    /**
     * The longitude of the current position.
     */
    longitude: {
      type: Number,
      notify: true,
      reflectToAttribute: true,
      readOnly: true,
      value: null
    },

    /**
     * If true, the element won't be active at all.
     */
    idle: {
      type: Boolean,
      value: false
    },

    /**
     * If true, the latitude/longitude update as the device changes position.
     * If not set, the latitude/longitude are provided once.
     */
    watchPos: {
      type: Boolean,
      value: false
    },

    /**
     * If true, enables high accuracy GPS.
     */
    highAccuracy: {
      type: Boolean,
      value: false
    },

    /**
     * The maximumAge option in the Gelocation API.
     */
    maximumAge: {
      type: Number,
      value: 0
    },

    /**
     * The timeout option in the Gelocation API.
     */
    timeout: {
      type: Number,
      value: 5000
    },

    /**
     * Geolocation API position object
     */
    position: {
      type: Object,
      notify: true,
      readOnly: true,
      value: null
    }

  },

  observers: [
    'fetch(idle, watchPos, highAccuracy, timeout, maximumAge)'
  ],

 /**
   * Fired when the Geolocation API returns an error.
   *
   * @event geo-error
   * @param {Object} detail
   * @param {boolean} detail.error The error message.
   */

  /**
   * Fired when the Geolocation API returns a position result.
   *
   * @event geo-response
   * @param {Object} detail
   *   @param {Position} position The raw position object returned by the Geolocation API.
   *   @param {Number} detail.latitude Latitude of the current position.
   *   @param {Number} detail.longitude Longitude of the current position.
   */

  detached: function () {
    this._clearWatch(this._watch);
  },

  /**
   * Stop updating latitude/longitude as the device changes position.
   * @param {Number} watch watch ID value.
   */
  _clearWatch: function (watch) {
    if (watch) {
        navigator.geolocation.clearWatch(watch);
        this._watch = null;
    }
  },

  clear: function () {
    this._setPosition(null);
    this._setLatitude(null);
    this._setLongitude(null);
  },

  fetch: function () {
    this._clearWatch(this._watch);

    if (this.idle) {
      return;
    }

    var success = this._onPosition.bind(this);
    var error = this._onError.bind(this);
    var options = {
      enableHighAccuracy: this.highAccuracy,
      timeout: this.timeout,
      maximumAge: this.maximumAge
    };

    if (this.watchPos) {
      this._watch = navigator.geolocation.watchPosition(success, error, options);
    } else {
      navigator.geolocation.getCurrentPosition(success, error, options);
    }
  },

  /**
   * Success callback when the Geolocation API returns results.
   *
   * @param {Position} pos A position object from the Geolocation API.
   */
  _onPosition: function(pos) {
    this._setPosition(pos);
    this._setLatitude(pos.coords.latitude);
    this._setLongitude(pos.coords.longitude);

    this.fire('geo-response', {
      latitude: this.latitude,
      longitude: this.longitude,
      position: pos
    });
  },

  /**
   * Error callback when the Geolocation API returns an error.
   *
   * @param {Position} err The error that was returned.
   */
  _onError: function(err) {
    this.fire('geo-error', {
      error: err.code + ': ' + err.message,
      code: err.code
    });
  }
});
