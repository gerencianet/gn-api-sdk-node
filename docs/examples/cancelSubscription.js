'use strict';

var Gerencianet = require('gn-api-sdk-node');
var credentials = require('./credentials');

var options = {
  client_id: credentials.client_id,
  client_secret: credentials.client_secret,
  sandbox: true
}

var gerencianet = new Gerencianet(options);

gerencianet
  .cancelSubscription({
    subscription_id: 18,
    customer: true
  })
  .then(function (subscription) {
    console.log('Response:', subscription);
  })
  .catch(function (err) {
    console.log('Error:', err);
  })
  .done();
