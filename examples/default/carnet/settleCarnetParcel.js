'use strict';

var Gerencianet = require('gn-api-sdk-node');
var options = require('../../credentials');


var params = {
  id: 26812,
  parcel: 5
}

var gerencianet = new Gerencianet(options);

gerencianet
  .settleCarnetParcel(params)
      .then((resposta) => {
        console.log(resposta)
    })
    .catch((error) => {
        console.log(error);
    })
    .done();