'use strict';

var Gerencianet = require('gn-api-sdk-node');
var options = require('../../credentials');


var params = {
    id: 1001
}

var body = {
    description: 'This subscription is about a service'
}

var gerencianet = new Gerencianet(options);

gerencianet
    .createSubscriptionHistory(params, body)
.then((resposta) => {
        console.log(resposta);
    })
    .catch((error) => {
        console.log(error);
    })