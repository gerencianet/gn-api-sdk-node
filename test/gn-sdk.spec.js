'use strict'

var should = require('should');
var proxyquire = require('proxyquire');
var nock = require('nock');

var GnSdk = require('../lib/gn-sdk');
var constants = require('../lib/gn-constants');

var options = {
  client_id: 'clientId',
  client_secret: 'clientSecret',
  sandbox: false
}

describe('GN', function () {
  describe('sdk', function () {
    it('should create methods based on constants endpoints map', function (done) {
      var gn = new GnSdk(options);

      should(Object.keys(GnSdk.prototype).length)
        .equal(Object.keys(constants.ENDPOINTS).length);

      done();
    });

    it('should override constants.URL if urls are passed inside options', function (done) {
      options.urls = {
        production: 'http://localhost',
        sandbox: 'http://localhost'
      }

      var gn = new GnSdk(options);
      done();
    });

    it('should have created "createCharge" function', function (done) {
      var gn = new GnSdk(options);

      should(typeof (gn.createCharge))
        .equal('function');

      gn.createCharge()
        .should.be.fulfilled;

      done();
    });
  });
});