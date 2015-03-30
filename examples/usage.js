'use strict';

var Gerencianet = require('../index.js');

var options = {
  clientId: '',
  clientSecret: '',
  sandbox: false
}

var chargeInput = {
  items: [{
    name: 'Produto 1',
    value: 1000,
    amount: 2
  }]
}

var clientInput = {
  charge_id: '',
  name: '',
  email: '',
  document: '',
  birth: '1990-12-12',
  phone_number: ''
}

var paymentMethodInput = {
  method: 'visa',
  total: 5000
}

var paymentInput = {
  charge_id: '',
  payment: {
    credit_card: {
      parcels: 1,
      payment_token: 'ed60dae38eb02d3c400ad5e6a35d56ee5b39aeaf',
      billing_address: {
        street: 'Rua 3',
        number: 10,
        neighborhood: 'Lagoa',
        zipcode: '35400000',
        city: 'Ouro Preto',
        state: 'MG'
      }
    }
  }
}

var gerencianet = new Gerencianet(options);

var createClient = function(response) {
  console.log('Charge:', response);
  clientInput.charge_id = response.charge.id;
  paymentInput.charge_id = response.charge.id;
  return gerencianet.createClient(clientInput);
}

var createPayment = function(response) {
  console.log('Client', response);
  return gerencianet.createPayment(paymentInput)
}

gerencianet
  .createCharge(chargeInput)
  .then(createClient)
  .then(createPayment)
  .then(function(payment) {
    console.log('Payment:', payment);
  })
  .catch(function(err) {
    console.log('Error:', err);
  });