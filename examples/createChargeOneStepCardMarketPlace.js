'use strict';

var Gerencianet = require('gn-api-sdk-node');
var options = require('./credentials');


var body = {

  payment: {
    credit_card: {
      installments: 1,
      payment_token: 'InsiraAquiUmPayeementeCode',
      billing_address: {
        street: 'Street 3',
        number: 10,
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
  },

  items: [{
    name: 'Product 1',
    value: 500,
    amount: 1,
	marketplace: {
      repasses: [{
        payee_code: "Insira_aqui_o_indentificador_da_conta_destino",
        percentage: 2500
      }, {
        payee_code: "Insira_aqui_o_indentificador_da_conta_destino",
        percentage: 1500
      }]
    }
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
