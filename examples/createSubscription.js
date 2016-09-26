'use strict';

var Gerencianet = require('gn-api-sdk-node');
var credentials = require('./credentials');

var options = {
  client_id: credentials.client_id,
  client_secret: credentials.client_secret,
  sandbox: true
}

var planBody = {
  name: 'My first plan',
  repeats: 24,
  interval: 2
}

var subscriptionBody = {
  items: [{
    name: 'Product 1',
    value: 1000,
    amount: 2
  }]
}

var gerencianet = new Gerencianet(options);

var createSubscription = function (response) {
  var params = {
    id: response.data.plan_id
  }

  return gerencianet.createSubscription(params, subscriptionBody);
}

gerencianet
  .createPlan({}, planBody)
  .then(createSubscription)
  .then(console.log)
  .catch(console.log)
  .done();