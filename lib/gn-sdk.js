'use strict';

var GnEndpoints = require('./gn-endpoints');
var constants = require('./gn-constants');
var methods = constants.ENDPOINTS;

function GnSdk(options) {
  if (options.urls) {
    constants.URL = options.urls
  }

  this.endpoints = new GnEndpoints(options, constants);
}

Object
  .keys(methods)
  .forEach(function (key) {
    GnSdk.prototype[key] = function (obj) {
      return this.endpoints.run(key, obj);
    };
  });

module.exports = GnSdk;