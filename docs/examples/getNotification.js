'use strict';

var util = require('util');
var Gerencianet = require('gn-api-sdk-node');
var credentials = require('./credentials');

var options = {
  client_id: credentials.client_id,
  client_secret: credentials.client_secret,
  sandbox: true
}

var gerencianet = new Gerencianet(options);

gerencianet
  .getNotification({
    notification: '25294827-5926-4ee4-b7e1-d17cb099ef81'
  })
  .then(function (notification) {
    console.log('Response:',
      util.inspect(notification, false, null));
  })
  .catch(function (err) {
    console.log('Error:', err);
  })
  .done();