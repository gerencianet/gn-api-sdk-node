'use strict';

var GnEndpoints = require('./gn-endpoints');
var constants = require('./gn-constants');
var methods = constants.ENDPOINTS;

function GnSdk(options) {
  this.endpoints = new GnEndpoints(options);
}

Object
  .keys(methods)
  .forEach(function (key) {
    GnSdk.prototype[key] = function (obj) {
      return this.endpoints.run(key, obj);
    };
  });

module.exports = GnSdk;