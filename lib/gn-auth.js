'use strict';

var request = require('request');
var q = require('q');

function GnAuth(options, constants) {
  this.constants = constants;
  this.clientId = options.client_id;
  this.clientSecret = options.client_secret;
  this.baseUrl = options.baseUrl;
  this.sdkHeader = options.sdkHeader;
}

GnAuth.prototype.getAccessToken = function() {
  var defer = q.defer();

  var postParams = {
    url: this.baseUrl + this.constants.ENDPOINTS.authorize.route,
    json: true,
    headers: {
      'api-sdk': this.sdkHeader
    },
    body: {
      grant_type: 'client_credentials'
    },
    auth: {
      username: this.clientId,
      password: this.clientSecret
    }
  };

  var callback = function(err, httpResponse, body) {

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