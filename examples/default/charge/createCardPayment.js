'use strict';

var Gerencianet = require('gn-api-sdk-node');
var options = require('../../credentials');


var body = {
  payment: {
    credit_card: {
      installments: 1,
      payment_token: '6426f3abd8688639c6772963669bbb8e0eb3c319',
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
        cpf: '94271564656',
        birth: '1977-01-15',
        phone_number: '5144916523'
      }
    }
  }
}

var params = {
  id: 1000
}

var gerencianet = new Gerencianet(options);

gerencianet
  .payCharge(params, body)
  .then(console.log)
  .catch(console.log)
  .done();