'use strict';

var Gerencianet = require('gn-api-sdk-node');
var options = require('./credentials');


var params = {
  name: 'My Plan',
  limit: 20,
  offset: 0
}

var gerencianet = new Gerencianet(options);

gerencianet
  .getPlans(params)
  .then(console.log)
  .catch(console.log)
  .done();