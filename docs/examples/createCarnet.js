'use strict';

var Gerencianet = require('gn-api-sdk-node');
var credentials = require('./credentials');

var options = {
  client_id: credentials.client_id,
  client_secret: credentials.client_secret,
  sandbox: true
}

var carnetInput = {
  items: [{
    name: 'Carnet Item 1',
    value: 1000,
    amount: 2
  }],
  customer: {
    name: 'Gorbadoc Oldbuck',
    email: 'oldbuck@gerencianet.com.br',
    cpf: '04267484171',
    birth: '1977-01-15',
    phone_number: '5144916523'
  },
  repeats: 12,
  split_items: false
}

var gerencianet = new Gerencianet(options);

gerencianet
  .createCarnet(carnetInput)
  .then(function (carnet) {
    console.log('Response:', carnet);
  })
  .catch(function (err) {
    console.log('Error:', err);
  })
  .done();