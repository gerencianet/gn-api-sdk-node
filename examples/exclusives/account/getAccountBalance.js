const Gerencianet = require('gn-api-sdk-node')
const options = require('../../credentials')

const gerencianet = new Gerencianet(options)

gerencianet.getAccountBalance()
	.then((resposta) => {
		console.log(resposta)
	})
	.catch((error) => {
		console.log(error)
	})
