'use strict';

var Gerencianet = require('gn-api-sdk-node');
var options = require('../../credentials');


var params = {
  id: 1004
}

var body = {
  notification_url: 'http://yourdomain.com',
  custom_id: 'my_new_id'
}

var gerencianet = new Gerencianet(options);

gerencianet
  .updateCarnetMetadata(params, body)
  .then(console.log)
  .catch(console.log)
  .done();