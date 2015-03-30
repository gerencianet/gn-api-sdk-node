'use strict';

var GnEndpoints = require('./gn-endpoints');

function GnSdk(options) {
  this.endpoints = new GnEndpoints(options);
}

GnSdk.prototype.createCharge = function(charge) {
  return this.endpoints.charge(charge);
}

GnSdk.prototype.createClient = function(client) {
  return this.endpoints.client(client);
}

GnSdk.prototype.createPayment = function(payment) {
  return this.endpoints.pay(payment);
}

GnSdk.prototype.getPaymentMethods = function(options) {
  return this.endpoints.paymentMethods(options);
}

module.exports = GnSdk;