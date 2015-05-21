'use strict';

var Gerencianet = require('gn-api-sdk-node');
var moment = require('moment');
var credentials = require('./credentials');

var options = {
  client_id: credentials.client_id,
  client_secret: credentials.client_secret,
  sandbox: true
}

var tomorrow = moment()
  .add(1, 'days')
  .format('YYYY-MM-DD 00:00:00');

var paymentInput = {
  charge_id: 242,
  payment: {
    banking_billet: {
      expire_at: tomorrow
    }
  }
}

var gerencianet = new Gerencianet(options);

gerencianet
  .createPayment(paymentInput)
  .then(function (payment) {
    console.log('Payment:', payment);
  })
  .catch(function (err) {
    console.log('Error:', err);
  });