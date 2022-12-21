const Gerencianet = require('gn-api-sdk-node')
const options = require('../../credentials')

let params = {
	id: 26812,
}

const gerencianet = new Gerencianet(options)

gerencianet.settleCarnet(params)
	.then((resposta) => {
		console.log(resposta)
	})
	.catch((error) => {
		console.log(error)
	})
