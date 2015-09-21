'use strict';

var GnEndpoints = require('./gn-endpoints');
var constants = require('./gn-constants');
var methods = constants.ENDPOINTS;

function GnSdk(options) {
  if (options.urls) {
    constants.URL = options.urls;
  }

  this.options = options;
}

Object
  .keys(methods)
  .forEach(function (key) {
    GnSdk.prototype[key] = function (params, body) {
      var endpoints = new GnEndpoints(this.options, constants);
      return endpoints.run(key, params, body);
    };
  });

module.exports = GnSdk;