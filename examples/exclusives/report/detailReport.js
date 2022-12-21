const Gerencianet = require('gn-api-sdk-node')
const options = require('../../credentials')

let params = {
	id: 1,
}

const gerencianet = new Gerencianet(options)

gerencianet.createReport(params, [])
	.then((resposta) => {
		console.log(resposta)
	})
	.catch((error) => {
		console.log(error)
	})
