'use strict';

var request = require('request');
var q = require('q');
var constants = require('./gn-constants');
var GnAuth = require('./gn-auth');

function GnEndpoints(options) {
  options.baseUrl = options.sandbox ? constants.URL.sandbox : constants.URL.production;
  this.options = options;
  this.gnAuth = new GnAuth(options);
  this.accessToken = null;
}

var postParams = function (input, route) {
  var params = {
    url: this.options.baseUrl + route,
    json: true,
    form: {
      data: JSON.stringify(input)
    }
  }

  if (this.accessToken) {
    params.form.access_token = this.accessToken;
  }

  return params;
}

GnEndpoints.prototype.post = function (object, route) {
  var self = this;
  this.defer = q.defer();

  var directReqCallback = function (err, httpResponse, body) {
    if (err) {
      self.defer.reject(err);
    } else if (httpResponse.statusCode !== 200) {
      self.defer.reject(body);
    } else {
      self.defer.resolve(body);
    }
  }

  var withTokenReqCallback = function (err, httpResponse, body) {
    if (err) {
      self.defer.reject(err);
    } else if (httpResponse.statusCode === 401) {
      self.getAccessToken().then(directReq);
    } else if (httpResponse.statusCode !== 200) {
      self.defer.reject(body);
    } else {
      self.defer.resolve(body);
    }
  }

  var directReq = function () {
    request.post(postParams.call(self, object,
      constants.ENDPOINTS[route]), directReqCallback);
  }

  var withTokenReq = function () {
    request.post(postParams.call(self, object,
      constants.ENDPOINTS[route]), withTokenReqCallback);
  }

  if (!this.accessToken) {
    this.getAccessToken().then(directReq);
  } else {
    withTokenReq();
  }

  return this.defer.promise;
}

GnEndpoints.prototype.getAccessToken = function () {
  var self = this;
  return this.gnAuth.getAccessToken().then(function (response) {
    self.accessToken = response.access_token;
    return self.accessToken;
  }).catch(function (err) {
    return err;
  });
}

GnEndpoints.prototype.run = function (endpoint, options) {
  return this.post(endpoint, options);
}

module.exports = GnEndpoints;