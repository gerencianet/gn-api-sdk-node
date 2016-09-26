'use strict';

var Gerencianet = require('gn-api-sdk-node');
var credentials = require('./credentials');

var options = {
	client_id: credentials.client_id,
	client_secret: credentials.client_secret,
	sandbox: true
}

var params = {
	token: '252948279264ee47e117cb099ef81'
}

var gerencianet = new Gerencianet(options);

gerencianet
	.getNotification(params)
	.then(console.log)
	.catch(console.log)
	.done();