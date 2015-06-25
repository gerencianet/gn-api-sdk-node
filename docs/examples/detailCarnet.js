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
  .detailCarnet({
    carnet_id: 6
  })
  .then(function (carnet) {
    console.log('Response:',
      util.inspect(carnet, false, null));
  })
  .catch(function (err) {
    console.log('Error:', err);
  })
  .done();