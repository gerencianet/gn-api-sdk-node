const Gerencianet = require('gn-api-sdk-node')
const options = require('../../credentials')

let body = {
	tipoCob: 'cob',
}

const gerencianet = new Gerencianet(options)

gerencianet.pixCreateLocation([], body)
	.then((resposta) => {
		console.log(resposta)
	})
	.catch((error) => {
		console.log(error)
	})
