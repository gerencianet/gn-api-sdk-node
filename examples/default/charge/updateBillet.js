'use strict';

var Gerencianet = require('gn-api-sdk-node');
var options = require('../../credentials');


var params = {
  id: 1008
}

var body = {
  expire_at: '2020-12-12'
}

var gerencianet = new Gerencianet(options);

gerencianet
  .updateBillet(params, body)
  .then(console.log)
  .catch(console.log)
  .done();