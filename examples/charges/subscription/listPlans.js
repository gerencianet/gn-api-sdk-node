const Gerencianet = require('gn-api-sdk-node')
const options = require('../../credentials')

let params = {
	name: 'My Plan',
	limit: 20,
	offset: 0,
}

const gerencianet = new Gerencianet(options)

gerencianet.listPlans(params)
	.then((resposta) => {
		console.log(resposta)
	})
	.catch((error) => {
		console.log(error)
	})
