'use strict';

var Gerencianet = require('gn-api-sdk-node');
var options = require('../../credentials');


var body = {

  payment: {
    banking_billet: {
      expire_at: '2019-08-30',
      customer: {
        name: 'Gorbadoc Oldbuck',
        email: 'oldbuck@gerencianet.com.br',
        cpf: '94271564656',
        birth: '1977-01-15',
        phone_number: '5144916523'
      }
    }
  },

  items: [{
    name: 'Product 1',
    value: 1000,
    amount: 2
  }],
  shippings: [{
    name: 'Default Shipping Cost',
    value: 100
  }]
}

var gerencianet = new Gerencianet(options);

gerencianet
  .oneStep([], body)
  .then(console.log)
  .catch(console.log)
  .done();
