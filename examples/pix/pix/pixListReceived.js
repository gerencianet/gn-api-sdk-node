'use strict';

let Gerencianet = require('gn-api-sdk-node');
let options = require('../../credentials');

let params = {
    inicio: "2021-01-22T16:01:35Z",
    fim: "2021-11-30T20:10:00Z"
}

let gerencianet = new Gerencianet(options);

gerencianet.pixListReceived(params)
    .then(console.log)
    .catch(console.log)
    .done();
