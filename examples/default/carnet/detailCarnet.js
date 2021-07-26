'use strict';

var Gerencianet = require('gn-api-sdk-node');
var options = require('../../credentials');


var params = {
	id: 0
}

var gerencianet = new Gerencianet(options);

gerencianet
	.detailCarnet(params)
	.then((resposta) => {
		console.log(resposta)
	})
	.catch((error) => {
		console.log(error);
	})
	.done();