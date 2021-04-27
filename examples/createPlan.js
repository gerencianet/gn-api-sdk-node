'use strict';

var Gerencianet = require('gn-api-sdk-node');
var options = require('./credentials');


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