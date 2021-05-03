'use strict';

var Gerencianet = require('gn-api-sdk-node');
var options = require('../../credentials');


var params = {
	type: 'visa',
	total: 5000
}

var gerencianet = new Gerencianet(options);

gerencianet
	.getInstallments(params)
	.then(console.log)
	.catch(console.log)
	.done();