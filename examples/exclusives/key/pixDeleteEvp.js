const Gerencianet = require('gn-api-sdk-node')
const options = require('../../credentials')

let params = {
	chave: 'SUACHAVEPIX',
}

const gerencianet = new Gerencianet(options)

gerencianet.pixDeleteEvp(params)
	.then((resposta) => {
		console.log(resposta)
	})
	.catch((error) => {
		console.log(error)
	})
