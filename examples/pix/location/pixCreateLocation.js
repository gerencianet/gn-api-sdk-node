'use strict';

let Gerencianet = require('gn-api-sdk-node');
let options = require('../../credentials');

let body = {
    tipoCob: "cob"
}

let gerencianet = new Gerencianet(options);

gerencianet.pixCreateLocation([],body)
    .then(console.log)
    .catch(console.log)
    .done();
