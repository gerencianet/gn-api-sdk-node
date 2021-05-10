'use strict';

var Gerencianet = require('gn-api-sdk-node');
var options = require('../../credentials');


var params = {
  id: 25093006,
  parcel: 1
}

var body = {
  expire_at: '2024-12-12'
}

var gerencianet = new Gerencianet(options);

gerencianet
  .updateParcel(params, body)
  .then(console.log)
  .catch(console.log)
  .done();