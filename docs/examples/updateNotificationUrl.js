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
  .updateNotification({
    charge_id: 233,
    notification_url: 'http://google.com'
  })
  .then(function (notification) {
    console.log('Response:',
      util.inspect(notification, false, null));
  })
  .catch(function (err) {
    console.log('Error:', err);
  })
  .done();