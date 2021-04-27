'use strict';

var Gerencianet = require('gn-api-sdk-node');
var options = require('./credentials');


var params = {
    id: 1008
}

var body = {
    name: 'My new plan'
}

var gerencianet = new Gerencianet(options);

gerencianet
    .updatePlan(params, body)
    .then(console.log)
    .catch(console.log)
    .done();