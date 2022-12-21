const Gerencianet = require('gn-api-sdk-node')
const options = require('../../credentials')

let params = {
	id: 1001,
}

let body = {
	description: 'This charge was not fully paid',
}

const gerencianet = new Gerencianet(options)

gerencianet.createChargeHistory(params, body)
	.then((resposta) => {
		console.log(resposta)
	})
	.catch((error) => {
		console.log(error)
	})
