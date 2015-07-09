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

var subscriptionInput = {
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
    subscriptionInput.plan_id = response.data.plan_id;
    return gerencianet.createSubscription(subscriptionInput);
  } else {
    throw new Error();
  }
}

gerencianet
  .createPlan(planInput)
  .then(createPlanCallback)
  .then(console.log)
  .catch(console.log);
