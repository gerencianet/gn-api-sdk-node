'use strict';

var Gerencianet = require('gn-api-sdk-node');
var options = require('../../credentials');


var params = {
  id: 1008
}

var body = {
  parcel: 1,
  expire_at: '2020-12-12'
}

var gerencianet = new Gerencianet(options);

gerencianet
  .updateParcel(params, body)
  .then(console.log)
  .catch(console.log)
  .done();