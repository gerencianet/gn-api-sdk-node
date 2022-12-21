const Gerencianet = require('gn-api-sdk-node')
const options = require('../../credentials')

let params = {
	brand: 'visa',
	total: 5000,
}

const gerencianet = new Gerencianet(options)

gerencianet.getInstallments(params)
	.then((resposta) => {
		console.log(resposta)
	})
	.catch((error) => {
		console.log(error)
	})
