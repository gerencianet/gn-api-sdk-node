'use strict';

var Gerencianet = require('gn-api-sdk-node');
var credentials = require('./credentials');

var options = {
  client_id: credentials.client_id,
  client_secret: credentials.client_secret,
  sandbox: true
}

var params = {
  id: 1001
}

var gerencianet = new Gerencianet(options);

gerencianet
  .detailCharge(params)
  .then(console.log)
  .catch(console.log)
  .done();