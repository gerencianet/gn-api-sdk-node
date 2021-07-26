'use strict';

let Gerencianet = require('gn-api-sdk-node');
let options = require('../../credentials');


let body = {
    "valor": "7.89"
}

let params = {
    e2eId: "E18236120202104191813s0326120V4K",
    id: "101"
}

let gerencianet = new Gerencianet(options);

gerencianet.pixDevolution(params, body)
.then((resposta) => {
        console.log(resposta);
    })
    .catch((error) => {
        console.log(error);
    })
