'use strict';

let Gerencianet = require('gn-api-sdk-node');
let options = require('../../credentials');

options['validateMtls'] = true;

let body = {
    "webhookUrl": "https://exemplo-pix/webhook"
}

let params = {
    chave: "SUACHAVEPIX"
}

let gerencianet = new Gerencianet(options);

gerencianet.pixConfigWebhook(params, body)
.then((resposta) => {
        console.log(resposta);
    })
    .catch((error) => {
        console.log(error);
    })
