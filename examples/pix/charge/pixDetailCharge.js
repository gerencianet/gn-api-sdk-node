'use strict';

let Gerencianet = require('gn-api-sdk-node');
let options = require('../../credentials');

let params = {
    txid: "dt9BHlyzrb5jrFNAdfEDVpHgiOmDbVqVxd"
}

let gerencianet = new Gerencianet(options);

gerencianet.pixDetailCharge(params)
.then((resposta) => {
        console.log(resposta);
    })
    .catch((error) => {
        console.log(error);
    })
