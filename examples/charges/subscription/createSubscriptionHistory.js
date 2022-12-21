const Gerencianet = require('gn-api-sdk-node')
const options = require('../../credentials')

let params = {
	id: 1001,
}

let body = {
	description: 'This subscription is about a service',
}

const gerencianet = new Gerencianet(options)

gerencianet.createSubscriptionHistory(params, body)
	.then((resposta) => {
		console.log(resposta)
	})
	.catch((error) => {
		console.log(error)
	})
