const Gerencianet = require('gn-api-sdk-node')
const options = require('../../credentials')

const gerencianet = new Gerencianet(options)

let body = {
	valor: '0.01',
}

let params = {
	identificadorPagamento: 'urn:gerencianet:ea807997-9c28-47a7-8ebc-eeb672ea59f0',
}

gerencianet.ofDevolutionPix(params, body)
	.then((resposta) => {
		console.log(resposta)
	})
	.catch((error) => {
		console.log(error)
	})
