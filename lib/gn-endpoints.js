'use strict';

var request = require('request');
var q = require('q');
var GnAuth = require('./gn-auth');

function GnEndpoints(options, constants) {
  options.baseUrl = options.sandbox ? constants.URL.sandbox : constants.URL.production;
  this.options = options;
  this.gnAuth = new GnAuth(options, constants);
  this.accessToken = null;
  this.constants = constants;
};

GnEndpoints.prototype.run = function (name, params, body) {
  var self = this;
  self.defer = q.defer();
  self.endpoint = self.constants.ENDPOINTS[name];
  self.body = body;
  self.params = params;

  if (!self.accessToken) {
    self.getAccessToken()
      .then(self.directReq.bind(self));
  } else {
    self.withTokenReq.call(self);
  }

  return self.defer.promise;
};

GnEndpoints.prototype.getAccessToken = function () {
  var self = this;
  return this.gnAuth.getAccessToken()
    .then(function (response) {
      self.accessToken = response.access_token;
      return self.accessToken;
    }).catch(function (err) {
      return err;
    });
};

GnEndpoints.prototype.getResponse = function (response, body) {
  return this.options
    .raw_response ? response : body;
};

GnEndpoints.prototype.directReq = function () {
  var self = this;

  request[self.endpoint.method](self.getParams.call(self,
    self.endpoint.route), self.directReqCallback.bind(self));
};

GnEndpoints.prototype.withTokenReq = function () {
  var self = this;
  request[self.endpoint.method](self.getParams.call(self,
    self.endpoint.route), self.withTokenReqCallback.bind(self));
};

GnEndpoints.prototype.getParams = function (route) {
  var self = this;
  var regex = /\:(\w+)/g;
  var query = '';
  var placeholders = route.match(regex);

  var getVariables = function () {
    return placeholders.map(function (item) {
      return item.replace(':', '')
    });
  }

  var updateRoute = function () {
    var variables = getVariables();
    variables.forEach(function (value, index) {
      if (self.params[value]) {
        route = route.replace(placeholders[index], self.params[value]);
        delete self.params[value];
      }
    });
  }

  var getQueryString = function () {
    var keys = Object.keys(self.params);
    var initial = keys.length >= 1 ? '?' : '';
    return keys.reduce(function (previous, current, index, array) {
      var next = (index === array.length - 1) ? '' : '&';
      return [previous, current, '=',
        self.params[current], next
      ].join('');
    }, initial);
  }

  if (placeholders) {
    updateRoute();
    query = getQueryString();
  }

  var req = {
    url: [this.options.baseUrl, route, query].join(''),
    json: true,
    body: this.body
  };

  if (this.accessToken) {
    req.auth = {
      bearer: this.accessToken
    }
  }

  return req;
};

GnEndpoints.prototype.withTokenReqCallback = function (err, httpResponse, httpResponseBody) {
  var self = this;
  var response = self.getResponse(httpResponse, httpResponseBody);

  if (err) {
    self.defer.reject(err);
  } else if (httpResponse.statusCode === 401) {
    self.getAccessToken().then(self.directReq.bind(self));
  } else if (httpResponse.statusCode !== 200) {
    self.defer.reject(response);
  } else {
    self.defer.resolve(response);
  }
};

GnEndpoints.prototype.directReqCallback = function (err, httpResponse, bodyResponse) {
  var response = this.getResponse(httpResponse, bodyResponse);

  if (err) {
    this.defer.reject(err);
  } else if (httpResponse.statusCode !== 200) {
    this.defer.reject(response);
  } else {
    this.defer.resolve(response);
  }
};


module.exports = GnEndpoints;