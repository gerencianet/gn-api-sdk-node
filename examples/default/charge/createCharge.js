'use strict';

var Gerencianet = require('gn-api-sdk-node');
var options = require('../../credentials');


var body = {
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
  .createCharge({}, body)
      .then((resposta) => {
        console.log(resposta)
    })
    .catch((error) => {
        console.log(error);
    })
    .done();