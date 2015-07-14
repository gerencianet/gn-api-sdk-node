'use strict';

var request = require('request');
var constants = require('./gn-constants');
var q = require('q');

function GnAuth(options) {
  this.clientId = options.client_id;
  this.clientSecret = options.client_secret;
  this.baseUrl = options.baseUrl;
}

GnAuth.prototype.getAccessToken = function () {
  var defer = q.defer();

  var postParams = {
    url: this.baseUrl + constants.ENDPOINTS.authorize,
    json: true,
    body: {
      grant_type: 'client_credentials'
    },
    auth: {
      username: this.clientId,
      password: this.clientSecret
    }
  };

  var callback = function (err, httpResponse, body) {

    if (err) {
      defer.reject(err, httpResponse);
    } else if (httpResponse.statusCode !== 200) {
      defer.reject(body, httpResponse);
    } else {
      defer.resolve(body, httpResponse);
    }
  };

  request.post(postParams, callback);

  return defer.promise;
};

module.exports = GnAuth;