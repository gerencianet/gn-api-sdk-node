'use strict';

var Gerencianet = require('gn-api-sdk-node');
var options = require('../../credentials');


var params = {
	token: '252948279264ee47e117cb099ef81'
}

var gerencianet = new Gerencianet(options);

gerencianet
	.getNotification(params)
	.then(console.log)
	.catch(console.log)
	.done();