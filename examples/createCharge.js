'use strict';

var Gerencianet = require('gn-api-sdk-node');
var credentials = require('./credentials');

var options = {
  client_id: credentials.client_id,
  client_secret: credentials.client_secret,
  sandbox: true
}

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
  .then(console.log)
  .catch(console.log)
  .done();