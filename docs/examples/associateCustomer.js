'use strict';

var Gerencianet = require('gn-api-sdk-node');
var credentials = require('./credentials');

var options = {
  client_id: credentials.client_id,
  client_secret: credentials.client_secret,
  sandbox: true
}

var customerInput = {
  charge_id: 223,
  customer: {
    name: 'Gorbadoc Oldbuck',
    email: 'oldbuck@gerencianet.com.br',
    cpf: '04267484171',
    birth: '1977-01-15',
    phone_number: '5144916523'
  }
}

var gerencianet = new Gerencianet(options);

gerencianet
  .associateCustomer(customerInput)
  .then(function (customer) {
    console.log('Response:', customer);
  })
  .catch(function (err) {
    console.log('Error:', err);
  });