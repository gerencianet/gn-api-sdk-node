'use strict';

var GnSdk = require('./lib/gn-sdk');

module.exports = function(options) {
  return new GnSdk(options);
}