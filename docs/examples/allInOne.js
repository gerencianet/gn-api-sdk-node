'use strict';

var Gerencianet = require('gn-api-sdk-node');
var credentials = require('./credentials');

var options = {
  client_id: credentials.client_id,
  client_secret: credentials.client_secret,
  sandbox: true
}

var chargeBody = {
  items: [{
    name: 'Product 1',
    value: 1000,
    amount: 2
  }],
  shippings: [{
    name: 'Default Shipping Cost',
    value: 100
  }, {
    name: 'Adicional Shipping Cost',
    value: 150
  }]
}

var paymentBody = {
  payment: {
    credit_card: {
      installments: 1,
      payment_token: '8c888fe1e7d96112020cf9fcf5e4db5b9dba5cf6',
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
        cpf: '04267484171',
        birth: '1977-01-15',
        phone_number: '5144916523'
      }
    }
  }
}

var gerencianet = new Gerencianet(options);

var payCharge = function (response) {
  var params = {
    id: response.data.charge_id
  }

  return gerencianet.payCharge(params, paymentBody);
}

gerencianet
  .createCharge({}, chargeBody)
  .then(payCharge)
  .then(console.log)
  .catch(console.log)
  .done();