'use strict';

var Gerencianet = require('gn-api-sdk-node');
var credentials = require('./credentials');

var options = {
  client_id: credentials.client_id,
  client_secret: credentials.client_secret,
  sandbox: true
}

var chargeInput = {
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

var customerInput = {
  charge_id: 223,
  name: 'Gorbadoc Oldbuck',
  email: 'oldbuck@gerencianet.com.br',
  document: '04267484171',
  birth: '1977-01-15',
  phone_number: '5044916523'
}

var paymentMethodInput = {
  method: 'visa',
  total: 5000
}

var paymentInput = {
  charge_id: 223,
  payment: {
    credit_card: {
      parcels: 1,
      payment_token: 'fec500b1f3eb16615ca61f7c4781f51dcde49131',
      billing_address: {
        street: 'Street 3',
        number: 10,
        neighborhood: 'Bauxita',
        zipcode: '35400000',
        city: 'Ouro Preto',
        state: 'MG'
      }
    }
  }
}

var gerencianet = new Gerencianet(options);

var createCustomer = function (response) {
  console.log(response);
  if (response.code === 200) {
    customerInput.charge_id = response.charge.id;
    paymentInput.charge_id = response.charge.id;
    return gerencianet.createCustomer(customerInput);
  } else {
    throw new Error();
  }
}

var createPayment = function (response) {
  console.log(response);
  if (response.code === 200) {
    return gerencianet.createPayment(paymentInput)
  } else {
    throw new Error();
  }
}

gerencianet
  .createCharge(chargeInput)
  .then(createCustomer)
  .then(createPayment)
  .then(console.log)
  .catch(console.log);