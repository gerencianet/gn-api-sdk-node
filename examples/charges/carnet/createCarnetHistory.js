const Gerencianet = require('gn-api-sdk-node')
const options = require('../../credentials')

let params = {
	id: 1001,
}

let body = {
	description: 'This carnet is about a service',
}

const gerencianet = new Gerencianet(options)

gerencianet.createCarnetHistory(params, body)
	.then((resposta) => {
		console.log(resposta)
	})
	.catch((error) => {
		console.log(error)
	})
