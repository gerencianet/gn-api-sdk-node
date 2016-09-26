'use strict';

var Gerencianet = require('gn-api-sdk-node');
var credentials = require('./credentials');

var options = {
  client_id: credentials.client_id,
  client_secret: credentials.client_secret,
  sandbox: true
}

var params = {
  id: 1009
}

var body = {
  notification_url: 'http://yourdomain.com',
  custom_id: 'my_new_id'
}

var gerencianet = new Gerencianet(options);

gerencianet
  .updateSubscriptionMetadata(params, body)
  .then(console.log)
  .catch(console.log)
  .done();