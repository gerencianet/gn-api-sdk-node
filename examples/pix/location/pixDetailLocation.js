'use strict';

let Gerencianet = require('gn-api-sdk-node');
let options = require('../../credentials');

let params = {
    id: "95"
}

let gerencianet = new Gerencianet(options);

gerencianet.pixDetailLocation(params)
.then((resposta) => {
        console.log(resposta);
    })
    .catch((error) => {
        console.log(error);
    })
