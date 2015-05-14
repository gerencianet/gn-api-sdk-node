'use strict';

var Gerencianet = require('gn-api-sdk-node');
var credentials = require('./credentials');

var options = {
  client_id: credentials.client_id,
  client_secret: credentials.client_secret,
  sandbox: true
}

var chargeInput = {
  items: [{
    name: 'Product 1',
    value: 1000,
    amount: 2
  }],
  subscription: {
    interval: 1,
    repeats: 2
  }
}

var gerencianet = new Gerencianet(options);

gerencianet
  .createCharge(chargeInput)
  .then(function (charge) {
    console.log('Response:', charge);
  })
  .catch(function (err) {
    console.log('Error:', err);
  })
  .done();