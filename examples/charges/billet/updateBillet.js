const Gerencianet = require('gn-api-sdk-node')
const options = require('../../credentials')

let params = {
	id: 1008,
}

let body = {
	expire_at: '2024-12-12',
}

const gerencianet = new Gerencianet(options)

gerencianet.updateBillet(params, body)
	.then((resposta) => {
		console.log(resposta)
	})
	.catch((error) => {
		console.log(error)
	})
