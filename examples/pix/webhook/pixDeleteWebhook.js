'use strict';

let Gerencianet = require('gn-api-sdk-node');
let options = require('../../credentials');

let params = {
    chave: "SUACHAVEPIX",
}

let gerencianet = new Gerencianet(options);

gerencianet.pixDeleteWebhook(params)
    .then(console.log)
    .catch(console.log)
    .done();
