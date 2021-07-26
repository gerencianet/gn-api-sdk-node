'use strict';

let Gerencianet = require('gn-api-sdk-node');
let options = require('../../credentials');

let params = {
    chave: "SUACHAVEPIX"
}

let gerencianet = new Gerencianet(options);

gerencianet.pixDetailWebhook(params)
.then((resposta) => {
        console.log(resposta);
    })
    .catch((error) => {
        console.log(error);
    })
