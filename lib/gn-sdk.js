'use strict';

var GnEndpoints = require('./gn-endpoints');

function GnSdk(options) {
  this.endpoints = new GnEndpoints(options);
}

GnSdk.prototype.createCharge = function (charge) {
  return this.endpoints.run('charge', charge);
}

GnSdk.prototype.createClient = function (client) {
  return this.endpoints.run('client', client);
}

GnSdk.prototype.createPayment = function (payment) {
  return this.endpoints.run('payment', payment);
}

GnSdk.prototype.getPaymentMethods = function (options) {
  return this.endpoints.run('paymentMethods', options);
}

module.exports = GnSdk;