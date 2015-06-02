'use strict';

var util = require('util');
var Gerencianet = require('gn-api-sdk-node');
var credentials = require('./credentials');

var options = {
  client_id: credentials.client_id,
  client_secret: credentials.client_secret,
  sandbox: true
}

var gerencianet = new Gerencianet(options);

gerencianet
  .deletePlan({
    plan_id: 1
  })
  .then(function (plan) {
    console.log('Response:',
      util.inspect(plan, false, null));
  })
  .catch(function (err) {
    console.log('Error:', err);
  })
  .done();