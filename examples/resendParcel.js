'use strict';

var Gerencianet = require('gn-api-sdk-node');
var credentials = require('./credentials');

var options = {
  client_id: credentials.client_id,
  client_secret: credentials.client_secret,
  sandbox: true
}

var params = {
  id: 1002,
  parcel: 1
}

var body = {
  email: 'oldbuck@gerencianet.com.br'
}

var gerencianet = new Gerencianet(options);

gerencianet
  .resendParcel(params, body)
  .then(console.log)
  .catch(console.log)
  .done();