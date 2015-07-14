'use strict'

var should = require('should');
var proxyquire = require('proxyquire');
var nock = require('nock');

var GnAuth = require('../lib/gn-auth');
var constants = require('../lib/gn-constants');

var options = {}
var gn = {}
var _gn = {}
var requestStub = {};

var _GnAuth = proxyquire('../lib/gn-auth', {
  'request': requestStub
});

var accessTokenResponseOk = {
  'token_type': 'bearer',
  'access_token': '6c21a49cb395096e0cd308b3950f43afafc47a5b',
  'expires_in': 3600,
  'refresh_token': '63b7ecc775e15e6f167aeed03d5e4e2384903300'
}

var accessTokenResponseErr = {
  'code': 400,
  'error': 'invalid_client',
  'error_description': 'Client credentials are invalid'
}

describe('GN', function () {
  before(function () {
    options = {
      client_id: 'clientId',
      client_secret: 'clientSecret',
      baseUrl: constants.URL.sandbox
    }

    gn = new GnAuth(options);
  });

  describe('oauth authentication', function () {
    it('should get an access token', function (done) {
      var expected = nock(constants.URL.sandbox)
        .post(constants.ENDPOINTS.authorize)
        .reply(200, accessTokenResponseOk);

      gn.getAccessToken()
        .then(function (response) {
          should(response)
            .eql(accessTokenResponseOk)
          done();
        })
        .catch(function (err) {
          console.log(err);
        })
        .done();
    });

    it('should reject invalid credentials', function (done) {
      var expected = nock(constants.URL.sandbox)
        .post(constants.ENDPOINTS.authorize)
        .reply(400, accessTokenResponseErr);

      gn.getAccessToken().then(null, function (response) {
          should(response)
            .eql(accessTokenResponseErr)
          done();
        })
        .done();
    });

    it('should reject when an error occurs', function (done) {
      requestStub.post = function (params, callback) {
        callback(new Error('ops'));
      }

      _gn = new _GnAuth(options);

      _gn.getAccessToken().then(null, function (response) {
          should(response)
            .eql(new Error('ops'))
          done();
        })
        .done();
    });
  });
});