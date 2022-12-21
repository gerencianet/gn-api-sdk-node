const Gerencianet = require('gn-api-sdk-node')
const options = require('../../credentials')

let params = {
	id: 1008,
}

let body = {
	name: 'My new plan',
}

const gerencianet = new Gerencianet(options)

gerencianet.updatePlan(params, body)
	.then((resposta) => {
		console.log(resposta)
	})
	.catch((error) => {
		console.log(error)
	})
