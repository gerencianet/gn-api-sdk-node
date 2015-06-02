'use strict';

var Gerencianet = require('gn-api-sdk-node');
var credentials = require('./credentials');

var options = {
  client_id: credentials.client_id,
  client_secret: credentials.client_secret,
  sandbox: true
}

var planInput = {
    name: 'My first plan',
    repeats: 24,
    interval: 2
}

var chargeInput = {
  items: [{
    name: 'Product 1',
    value: 1000,
    amount: 2
  }]
}

var gerencianet = new Gerencianet(options);

var createPlanCallback = function (response) {
  console.log(response);
  if (response.code === 200) {
    chargeInput.plan_id = response.plan.id;
    return chargeInput;
  } else {
    throw new Error();
  }
}

var createChargeCallback = function (response) {
  return gerencianet.createCharge(chargeInput)
}

gerencianet
  .createPlan(planInput)
  .then(createPlanCallback)
  .then(createChargeCallback)
  .then(console.log)
  .catch(console.log);