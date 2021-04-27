'use strict';

var Gerencianet = require('gn-api-sdk-node');
var options = require('./credentials');


var params = {
  id: 0
}

var body = {
  payment: {
    credit_card: {
      payment_token: '33ffd6d982cd63f767fb2ee5c458cd39e8fc0ea0',
      billing_address: {
        street: 'Av. JK',
        number: 909,
        neighborhood: 'Bauxita',
        zipcode: '35400000',
        city: 'Ouro Preto',
        state: 'MG'
      },
      customer: {
        name: 'Gorbadoc Oldbuck',
        email: 'oldbuck@gerencianet.com.br',
        cpf: '04267484171',
        birth: '1977-01-15',
        phone_number: '5144916523'
      }
    }
  }
}

var gerencianet = new Gerencianet(options);

gerencianet
  .paySubscription(params, body)
  .then(console.log)
  .catch(console.log)
  .done();