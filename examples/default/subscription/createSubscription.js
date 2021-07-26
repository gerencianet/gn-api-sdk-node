'use strict';

var Gerencianet = require('gn-api-sdk-node');
var options = require('../../credentials');


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
      .then((resposta) => {
        console.log(resposta)
    })
    .catch((error) => {
        console.log(error);
    })
    .done();