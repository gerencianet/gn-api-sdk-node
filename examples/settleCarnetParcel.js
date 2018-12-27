'use strict';

var Gerencianet = require('gn-api-sdk-node');
var credentials = require('./credentials');

var options = {
  client_id: credentials.client_id,
  client_secret: credentials.client_secret,
  sandbox: true
}

var params = {
  id: 26812,
  parcel: 5
}

var gerencianet = new Gerencianet(options);

gerencianet
  .settleCarnetParcel(params)
  .then(console.log)
  .catch(console.log)
  .done();