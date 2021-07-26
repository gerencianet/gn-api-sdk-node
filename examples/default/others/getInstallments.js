'use strict';

var Gerencianet = require('gn-api-sdk-node');
var options = require('../../credentials');


var params = {
	brand: 'visa',
	total: 5000
}

var gerencianet = new Gerencianet(options);

gerencianet
	.getInstallments(params)
	.then((resposta) => {
		console.log(resposta)
	})
	.catch((error) => {
		console.log(error);
	})
	.done();