'use strict';

let Gerencianet = require('gn-api-sdk-node');
let options = require('../../credentials');

let body = {
    "valor": "12.34",
    "pagador": {
        "chave": "SUACHAVEPIX"
    },
    "favorecido": {
        "chave": "ChavePixDeDestino"
    }
}

let gerencianet = new Gerencianet(options);

gerencianet.pixSend([], body)
    .then(console.log)
    .catch(console.log)
    .done();
