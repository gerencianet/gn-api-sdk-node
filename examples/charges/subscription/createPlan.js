const Gerencianet = require('gn-api-sdk-node')
const options = require('../../credentials')

let params = {}

let body = {
	name: 'My first plan',
	repeats: 24,
	interval: 2,
}

const gerencianet = new Gerencianet(options)

gerencianet.createPlan(params, body)
	.then((resposta) => {
		console.log(resposta)
	})
	.catch((error) => {
		console.log(error)
	})
