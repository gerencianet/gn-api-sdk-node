'use strict';

var request = require('request');
var constants = require('./gn-constants');
var q = require('q');

function GnAuth(options) {
  this.clientId = options.clientId;
  this.clientSecret = options.clientSecret;
  this.baseUrl = options.baseUrl;
}

GnAuth.prototype.getAccessToken = function() {
  var defer = q.defer();

  var postParams = {
    url: this.baseUrl + constants.ENDPOINTS.authorize,
    json: true,
    form: {
      grant_type: 'client_credentials',
      client_id: this.clientId,
      client_secret: this.clientSecret
    }
  }

  var callback = function(err, httpResponse, body) {
    if (err)
      defer.reject(err)
    else if (httpResponse.statusCode != 200)
      defer.reject(body)
    else
      defer.resolve(body)
  }

  request.post(postParams, callback);
  return defer.promise;
}

module.exports = GnAuth;