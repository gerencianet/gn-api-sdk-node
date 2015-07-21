'use strict'

var should = require('should');
var proxyquire = require('proxyquire');
var simple = require('simple-mock');
var nock = require('nock');

var GnEndpoints = require('../lib/gn-endpoints');
var constants = require('../lib/gn-constants');

constants.URL.production = 'http://localhost'
constants.URL.sandbox = 'http://localhost'

var gn = {}
var _gn = {}
var options = {}
var requestStub = {};
var expected = {}

var _GnEndpoints = proxyquire('../lib/gn-endpoints', {
  'request': requestStub
});

var accessTokenResponseOk = {
  'token_type': 'bearer',
  'access_token': '6c21a49cb395096e0cd308b3950f43afafc47a5b',
  'expires_in': 3600,
  'refresh_token': '63b7ecc775e15e6f167aeed03d5e4e2384903300'
}

var accessTokenResponseErr = {
  'code': 401,
  'error': 'invalid_client',
  'error_description': 'Client credentials are invalid'
}

var createChargeResponseError = {
  'code': 500,
  'error': 'invalid_json',
  'error_description': {
    'property': 'items',
    'message': 'Missing required property: items'
  }
}

var createChargeResponseOk = {
  'code': 200,
  'charge': {
    'id': '56986',
    'total': 1999,
    'status': 'new',
    'custom_id': null,
    'created_at': '2015-03-17'
  }
}

describe('GN', function () {
  beforeEach(function () {
    options = {
      client_id: 'clientId',
      client_secret: 'clientSecret',
      sandbox: false
    }

    requestStub.post = function (params, callback) {
      callback(new Error('ops'));
    }

    gn = new GnEndpoints(options, constants);
    options.sandbox = true;
    _gn = new _GnEndpoints(options, constants);

    nock.cleanAll();
  });

  describe('endpoints', function () {
    describe('oauth', function () {
      it('should resolve promise with an access token', function (done) {
        var expected = nock(constants.URL.production)
          .post(constants.ENDPOINTS.authorize.route)
          .reply(200, accessTokenResponseOk);

        gn.getAccessToken()
          .then(function (response) {
            response.should.be.eql(accessTokenResponseOk.access_token)
            expected.done();
            done();
          })
          .done();
      });

      it('should reject promise with unauthorized response', function (done) {
        var expected = nock(constants.URL.production)
          .post(constants.ENDPOINTS.authorize.route)
          .reply(401, accessTokenResponseErr);

        gn.getAccessToken()
          .then(function (response) {
            response.should.be.eql(accessTokenResponseErr)
            expected.done();
            done();
          })
          .done();
      });
    });

    describe('posting', function () {
      describe('when accessToken is null', function () {
        it('should resolve promise', function (done) {
          expected = nock(constants.URL.production)
            .post(constants.ENDPOINTS.authorize.route)
            .reply(200, accessTokenResponseOk)
            .post(constants.ENDPOINTS.createCharge.route)
            .reply(200, createChargeResponseOk);

          gn.run('createCharge', {}, {})
            .then(function (response) {
              response.should.be.eql(createChargeResponseOk)
              expected.done();
              done();
            })
            .done();
        });

        it('should reject promise when response is not 200', function (done) {
          var expected = nock(constants.URL.production)
            .post(constants.ENDPOINTS.authorize.route)
            .reply(200, accessTokenResponseOk)
            .post(constants.ENDPOINTS.createCharge.route)
            .reply(400, createChargeResponseError);

          gn.run('createCharge', {}, {})
            .then(null, function (response) {
              response.should.be.eql(createChargeResponseError)
              expected.done();
              done();
            })
            .done();
        });

        it('should reject promise when an error occurs', function (done) {
          _gn.run('createCharge')
            .then(null, function (response) {
              response.should.be.eql(new Error('ops'));
              done();
            })
            .done();
        });
      });

      describe('when accessToken exists', function () {
        describe('if expired', function () {
          beforeEach(function () {
            //spy on getAccessToken
            simple.mock(gn, 'getAccessToken');
            gn.accessToken = 'myprecious';
          });

          it('should resolve promise', function (done) {
            var expected = nock(constants.URL.production)
              .post(constants.ENDPOINTS.createCharge.route)
              .reply(401, createChargeResponseError)
              .post(constants.ENDPOINTS.authorize.route)
              .reply(200, accessTokenResponseOk)
              .post(constants.ENDPOINTS.createCharge.route)
              .reply(200, createChargeResponseOk);

            gn.run('createCharge', {}, {})
              .then(function (response) {
                response.should.be.eql(createChargeResponseOk);
                should(gn.getAccessToken.callCount).equal(1);
                expected.done();
                done();
              })
              .done();
          });

          it('should resolve promise with raw response', function (done) {
            var expected = nock(constants.URL.production)
              .post(constants.ENDPOINTS.createCharge.route)
              .reply(401, createChargeResponseError)
              .post(constants.ENDPOINTS.authorize.route)
              .reply(200, accessTokenResponseOk)
              .post(constants.ENDPOINTS.createCharge.route)
              .reply(200, createChargeResponseOk);

            gn.options.raw_response = true;

            gn.run('createCharge', {}, {})
              .then(function (response) {
                response.headers.should.not.be.undefined;
                should(gn.getAccessToken.callCount).equal(1);
                expected.done();
                done();
              })
              .done();
          });

          it('should reject promise', function (done) {
            var expected = nock(constants.URL.production)
              .post(constants.ENDPOINTS.createCharge.route)
              .reply(401, createChargeResponseError)
              .post(constants.ENDPOINTS.authorize.route)
              .reply(200, accessTokenResponseOk)
              .post(constants.ENDPOINTS.createCharge.route)
              .reply(500, createChargeResponseError);

            gn.run('createCharge', {}, {})
              .then(null, function (response) {
                response.should.be.eql(createChargeResponseError);
                should(gn.getAccessToken.callCount).equal(1);
                expected.done();
                done();
              })
              .done();
          });
        });

        describe('if server is off', function () {
          beforeEach(function () {
            //spy on getAccessToken
            simple.mock(gn, 'getAccessToken');
            gn.accessToken = 'myprecious';
          });

          it('should reject promise', function (done) {
            var expected = nock(constants.URL.production)
              .post(constants.ENDPOINTS.createCharge.route)
              .replyWithError('server is off');

            gn.run('createCharge', {}, {})
              .then(null, function (response) {
                should(gn.getAccessToken.callCount).equal(0);
                expected.done();
                done();
              })
              .done();
          });
        });

        describe('if not expired', function () {
          beforeEach(function () {
            gn.accessToken = 'myprecious';
            simple.mock(gn, 'getAccessToken');
          });

          it('should resolve promise', function (done) {
            var expected = nock(constants.URL.production)
              .post(constants.ENDPOINTS.createCharge.route)
              .reply(200, createChargeResponseOk);

            gn.run('createCharge', {}, {})
              .then(function (response) {
                response.should.be.eql(createChargeResponseOk);
                should(gn.getAccessToken.callCount).equal(0);
                expected.done();
                done();
              })
              .done();
          });

          it('should reject promise', function (done) {
            var expected = nock(constants.URL.production)
              .post(constants.ENDPOINTS.createCharge.route)
              .reply(400, createChargeResponseOk);

            gn.run('createCharge', {}, {})
              .then(null, function (response) {
                response.should.be.eql(createChargeResponseOk);
                should(gn.getAccessToken.callCount).equal(0);
                expected.done();
                done();
              })
              .done();
          });
        });
      });
    });

    describe('url params', function () {
      it('should map params object to url specific placeholders', function (done) {
        gn.params = {
          id: 1,
          other: 'other'
        }

        var params = gn.getParams('/charge/:id/:other');
        should(params.url)
          .equal('http://localhost/charge/1/other');

        done();
      });

      it('should map spare params attributes to a query string', function (done) {
        gn.params = {
          id: 1,
          name: 'name',
          lastName: 'lastName'
        }

        var params = gn.getParams('/charge/:id');
        should(params.url)
          .equal('http://localhost/charge/1?name=name&lastName=lastName');
        done();
      });

      it('should not map empy params', function (done) {
        gn.params = {
          id: 1
        }

        var params = gn.getParams('/charges/:missing');
        should(params.url)
          .equal('http://localhost/charges/:missing?id=1');
        done();
      });
    });
  }); //endpoints
}); //GN