'use strict';

var Gerencianet = require('gn-api-sdk-node');
var credentials = require('./credentials');

var options = {
  client_id: credentials.client_id,
  client_secret: credentials.client_secret,
  sandbox: true
}

var planInput = {
    name: 'My first plan',
    repeats: 24,
    interval: 2
}

var gerencianet = new Gerencianet(options);

gerencianet
  .createPlan(planInput)
  .then(function (plan) {
    console.log('Response:', plan);
  })
  .catch(function (err) {
    console.log('Error:', err);
  })
  .done();