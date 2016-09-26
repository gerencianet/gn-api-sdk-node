'use strict';

var Gerencianet = require('gn-api-sdk-node');
var credentials = require('./credentials');

var options = {
  client_id: credentials.client_id,
  client_secret: credentials.client_secret,
  sandbox: true
}

var params = {}

var body = {
  name: 'My first plan',
  repeats: 24,
  interval: 2
}

var gerencianet = new Gerencianet(options);

gerencianet
  .createPlan(params, body)
  .then(console.log)
  .catch(console.log)
  .done();